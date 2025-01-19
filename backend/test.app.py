# **Black-box AI: An ASMR Platform Demo**

# ----------------------------- Libraries & Frameworks -------------------------
# WaveGlow TTS: For generating natural, high-quality speech using 11 Labs.
# First Order Motion Model: For animating static photos into dynamic videos.
# Wav2Lip: For precise lip-syncing of speech and animations.

# ----------------------------- About the Demo -----------------------------
# This demo showcases:
# 1. **Text-to-Speech Generation**: Converts the script into a realistic AI voice using WaveGlow.
# 2. **Lip-Sync Animation**: Synchronizes lip movements to the generated audio.
# 3. **Avatar Animation**: Brings the static image of the avatar to life, integrating synchronized audio and motion.

# ----------------------------- Testing Methods -----------------------------
# **Input**:
#   - A static photo of the avatar.
#   - A script:
#       "Hello my name is Luna and welcome to my ASMR platform Black Box AI.
#        Here we will go on adventures deep inside the mind, travel alternate realities, and more."
# **Output**:
#   - A lifelike animated video with synchronized speech and lip movements.
# **Verification**:
#   - Check for smooth lip-syncing.
#   - Ensure the avatar's animation aligns with the script.
#   - Confirm audio quality and synchronization with the visuals.

###
# Demo
# Step 1: Generate audio using Eleven Labs
# Step 2: Create lip-sync animation
# Step 3: Animate the photo
# Step 4: Merge audio and video

# Imports
import torch
import torch.nn as nn
import numpy as np
import cv2
import matplotlib.pyplot as plt
from scipy.spatial import ConvexHull
import os

# Keypoint Extraction using Convex Hull
def extract_keypoints(image):
  if image is None:
    raise ValueError("Image is None, cannot extract keypoints.")
  gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
  corners = cv2.goodFeaturesToTrack(gray, maxCorners=10, qualityLevel=0.01, minDistance=10)
  if corners is None:
    raise ValueError("No keypoints detected in the image.")
  corners = np.intp(corners).reshape(-1, 2)
  hull = ConvexHull(corners)
  keypoints = corners[hull.vertices]
  return keypoints

# Simple Generator Model with Modifications
class Generator(nn.Module):
  def __init__(self):
    super(Generator, self).__init__()
    self.conv1 = nn.Conv2d(3, 64, kernel_size=3, padding=1)
    self.conv2 = nn.Conv2d(64, 64, kernel_size=3, padding=1)
    self.conv3 = nn.Conv2d(64, 3, kernel_size=3, padding=1)
    self.relu = nn.ReLU()

  def forward(self, x, kp_diff):
    # Check the number of dimensions in kp_diff
    if kp_diff.dim() == 2:
      kp_diff = kp_diff.unsqueeze(0).unsqueeze(-1).unsqueeze(-1) 
    elif kp_diff.dim() == 1:
      kp_diff = kp_diff.unsqueeze(0).unsqueeze(-1).unsqueeze(-1) 

    # Now kp_diff should have shape [batch_size, channels, 1, 1]
    # Expand to match the size of x
    kp_diff = kp_diff.expand(-1, x.size(1), x.size(2), x.size(3))

    # Add kp_diff to x as a modulation
    x = x + kp_diff
    x = self.relu(self.conv1(x))
    x = self.relu(self.conv2(x))
    x = self.conv3(x)
    return x

# Normalize Keypoints
def normalize_keypoints(kp_source, kp_driving):
  min_points = min(len(kp_source), len(kp_driving))
  kp_source = kp_source[:min_points]
  kp_driving = kp_driving[:min_points]
  if len(kp_source) == 0 or len(kp_driving) == 0:
    raise ValueError("Keypoints could not be extracted from one or more images.")
  return kp_driving - kp_source

# Extract Frames from Video
def extract_frames_from_video(video_path):
  if not os.path.exists(video_path):
    raise FileNotFoundError(f"Video file not found at {video_path}.")
  cap = cv2.VideoCapture(video_path)
  frames = []
  success, frame = cap.read()
  while success:
    frames.append(frame)
    success, frame = cap.read()
  cap.release()
  if len(frames) == 0:
    raise ValueError("No frames could be extracted from the video.")
  return frames

# Save Animation as MP4
def save_animation_as_mp4(frames, output_path, fps=30):
  height, width, _ = frames[0].shape
  fourcc = cv2.VideoWriter_fourcc(*'mp4v')
  out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))
  for frame in frames:
    out.write(frame)
  out.release()
  print(f"Animation saved to {output_path}")

# Main Animation Function
def animate(source_image, driving_video_frames, generator):
    kp_source = extract_keypoints(source_image)
    frames = []

    for frame in driving_video_frames:
        if frame is None:
            print("Warning: A frame in the driving video is None. Skipping...")
            continue
        kp_driving = extract_keypoints(frame)
        kp_diff = normalize_keypoints(kp_source, kp_driving)

        # Prepare tensors for model input
        source_tensor = torch.FloatTensor(source_image / 255.0).permute(2, 0, 1).unsqueeze(0)

        # Convert kp_diff to PyTorch tensor (ensure it is a float tensor)
        kp_diff = torch.FloatTensor(kp_diff)  # Convert to float tensor to allow mean operation

        # Ensure kp_diff has at least 2 dimensions (channels and keypoint coordinates)
        if kp_diff.dim() == 1:
            kp_diff = kp_diff.unsqueeze(0)  # Add a new dimension for channels (batch size of 1)

        # Expand kp_diff_tensor to match the size of the input image tensor (3 channels, height, width)
        kp_diff_tensor = torch.FloatTensor(kp_diff.mean(axis=0)).unsqueeze(0).unsqueeze(-1).unsqueeze(-1)
        
        # Expand to match the 3 channels of the input image
        kp_diff_tensor = kp_diff_tensor.expand(-1, 3, source_tensor.size(2), source_tensor.size(3))

        with torch.no_grad():
            generated_frame = generator(source_tensor, kp_diff_tensor).squeeze(0).permute(1, 2, 0).numpy()

        generated_frame = (generated_frame * 255).astype(np.uint8)
        frames.append(generated_frame)

    return frames

# Visualization Helper
def plot_keypoints(image, keypoints, title="Keypoints"):
  for x, y in keypoints:
    cv2.circle(image, (x, y), 5, (0, 255, 0), -1)
  plt.imshow(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
  plt.title(title)
  plt.axis("off")
  plt.show()

# Main
if __name__ == "__main__":
  source_image_path = "/content/drive/MyDrive/project-root-black-box/assets/avatar.png" 
  driving_video_path = "/content/drive/MyDrive/project-root-black-box/assets/avatar.mp4" 

  # Load source image
  if not os.path.exists(source_image_path):
    raise FileNotFoundError(f"Source image not found at {source_image_path}.")
  source_image = cv2.imread(source_image_path)

  # Extract frames from driving video
  driving_video_frames = extract_frames_from_video(driving_video_path)

  # Plot keypoints for the source image
  kp_source = extract_keypoints(source_image.copy())
  plot_keypoints(source_image.copy(), kp_source, title="Source Keypoints")

  # Initialize Generator
  generator = Generator()

  # Animate
  animated_frames = animate(source_image, driving_video_frames, generator)

  # Save animation as MP4
  output_path = "/content/drive/MyDrive/project-root-black-box/assets/avatar.mp4" 
  save_animation_as_mp4(animated_frames, output_path, fps=30)
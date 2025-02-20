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
import sys
import os
import yaml
import imageio
import numpy as np
from skimage.transform import resize
from skimage import img_as_ubyte
import torch
from tqdm.auto import tqdm
from IPython.display import display
import ipywidgets as widgets
from tempfile import NamedTemporaryFile
import ffmpeg
from shutil import copyfileobj
import PIL.Image
import cv2
import requests
import skimage.transform
import warnings
from base64 import b64encode
import io  # Added import for io
from models.generator import OcclusionAwareGenerator  # Make sure this is the correct generator
from models.keypoint_detector import KeypointDetector

# UI Elements for Image and Video Upload
input_image_widget = widgets.Output()
upload_input_image_button = widgets.FileUpload(accept='image/*', multiple=False)

input_video_widget = widgets.Output()
upload_input_video_button = widgets.FileUpload(accept='video/*', multiple=False)

# Variables to hold uploaded content
selected_image = None
selected_video = None

# Upload Handlers
def handle_image_upload(change):
    global selected_image
    if upload_input_image_button.value:
        image_info = list(upload_input_image_button.value.values())[0]
        selected_image = imageio.imread(io.BytesIO(image_info['content']))
        input_image_widget.clear_output()
        with input_image_widget:
            display(PIL.Image.open(io.BytesIO(image_info['content'])))

def handle_video_upload(change):
    global selected_video
    if upload_input_video_button.value:
        video_info = list(upload_input_video_button.value.values())[0]
        selected_video = imageio.mimread(io.BytesIO(video_info['content']))
        input_video_widget.clear_output()
        with input_video_widget:
            display(widgets.Label("Video uploaded successfully"))

upload_input_image_button.observe(handle_image_upload, names='value')
upload_input_video_button.observe(handle_video_upload, names='value')

# Model Dropdown
model = widgets.Dropdown(description="Model:", options=['vox', 'vox-adv', 'taichi', 'taichi-adv', 'nemo', 'mgif', 'fashion', 'bair'])

# Settings for the animation generation
relative = widgets.Checkbox(description="Relative keypoint displacement", value=True)
adapt_movement_scale = widgets.Checkbox(description="Adapt movement scale", value=True)

# Generate Button to create animation
generate_button = widgets.Button(description="Generate Animation", button_style='primary')

# Load checkpoints function (from demo.py)
def load_checkpoints(config_path, checkpoint_path, cpu=False):
    """Loads the generator and keypoint detector models from checkpoints."""
    with open(config_path) as f:
        config = yaml.safe_load(f)

    # Change Generator to OcclusionAwareGenerator
    generator = OcclusionAwareGenerator(**config['model_params']['generator_params'],
                                        **config['model_params']['common_params'])
    kp_detector = KeypointDetector(**config['model_params']['kp_detector_params'],
                                   **config['model_params']['common_params'])

    if not cpu:
        generator.cuda()
        kp_detector.cuda()

    checkpoint = torch.load(checkpoint_path, map_location='cpu' if cpu else None)
    generator.load_state_dict(checkpoint['generator'])
    kp_detector.load_state_dict(checkpoint['kp_detector'])

    generator.eval()
    kp_detector.eval()

    return generator, kp_detector

# Make animation function (from demo.py)
def make_animation(source_image, driving_video, generator, kp_detector, relative=True, adapt_movement_scale=True, cpu=False):
    """Generates an animation by transferring motion from a driving video to a source image."""
    with torch.no_grad():
        predictions = []
        source = torch.tensor(source_image[np.newaxis].astype(np.float32)).permute(0, 3, 1, 2)
        if not cpu:
            source = source.cuda()

        driving = torch.tensor(np.array(driving_video)[np.newaxis].astype(np.float32)).permute(0, 4, 1, 2, 3)

        kp_source = kp_detector(source)
        kp_driving_initial = kp_detector(driving[:, :, 0])

        for frame_idx in tqdm(range(driving.shape[2])):
            driving_frame = driving[:, :, frame_idx]
            if not cpu:
                driving_frame = driving_frame.cuda()

            kp_driving = kp_detector(driving_frame)
            kp_norm = normalize_kp(kp_source=kp_source, kp_driving=kp_driving,
                                   kp_driving_initial=kp_driving_initial, use_relative_movement=relative,
                                   use_relative_jacobian=relative, adapt_movement_scale=adapt_movement_scale)

            out = generator(source, kp_source=kp_source, kp_driving=kp_norm)
            predictions.append(np.transpose(out['prediction'].data.cpu().numpy(), [0, 2, 3, 1])[0])

    return predictions

# Placeholder for normalize_kp (you should define the actual function or import it)
def normalize_kp(kp_source, kp_driving, kp_driving_initial, use_relative_movement=True,
                 use_relative_jacobian=True, adapt_movement_scale=True):
    return kp_driving  # Placeholder logic for now

# Handle the animation generation
def generate_button_click(button):
    print("Generate button clicked!")  # Debug print
    if selected_image is None or selected_video is None:
        print("Please upload both an image and a video.")
        return

    print("Processing animation...")  # Debug print

    # Load the generator and keypoint detector
    model_name = model.value
    checkpoint_path = f'/content/drive/MyDrive/project-root-black-box/checkpoints/{model_name}.pth'
    config_path = f'/content/drive/MyDrive/project-root-black-box/configs/{model_name}-256.yaml'

    generator, kp_detector = load_checkpoints(config_path, checkpoint_path)

    # Generate animation
    predictions = make_animation(selected_image, selected_video, generator, kp_detector, relative=relative.value, adapt_movement_scale=adapt_movement_scale.value)

    # Save the animation as a video
    output_video_path = '/content/drive/MyDrive/project-root-black-box/assets/avatar.mp4'
    imageio.mimsave(output_video_path, [img_as_ubyte(frame) for frame in predictions], fps=30)

    print(f"Animation saved to {output_video_path}")
    display(widgets.Label(f"Animation saved to {output_video_path}"))

generate_button.on_click(generate_button_click)

# Layout for the UI
main = widgets.VBox([
    widgets.Label('Upload Image:'),
    widgets.HBox([input_image_widget, upload_input_image_button]),
    widgets.Label('Upload Video:'),
    widgets.HBox([input_video_widget, upload_input_video_button]),
    widgets.Label('Model Selection:'),
    model,
    relative,
    adapt_movement_scale,
    generate_button
])

display(main)
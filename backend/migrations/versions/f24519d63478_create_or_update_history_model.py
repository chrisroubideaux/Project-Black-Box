"""Create or update history model

Revision ID: f24519d63478
Revises: bca5b001d0e4
Create Date: 2025-03-10 20:24:13.788888

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f24519d63478'
down_revision = 'bca5b001d0e4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('history',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('user_id', sa.UUID(), nullable=False),
    sa.Column('video_id', sa.UUID(), nullable=False),
    sa.Column('history_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['video_id'], ['videos.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('user_likes', schema=None) as batch_op:
        batch_op.alter_column('video_id',
               existing_type=sa.VARCHAR(length=36),
               type_=sa.UUID(),
               existing_nullable=False)

    with op.batch_alter_table('videos', schema=None) as batch_op:
        batch_op.alter_column('id',
               existing_type=sa.VARCHAR(length=36),
               type_=sa.UUID(),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('videos', schema=None) as batch_op:
        batch_op.alter_column('id',
               existing_type=sa.UUID(),
               type_=sa.VARCHAR(length=36),
               existing_nullable=False)

    with op.batch_alter_table('user_likes', schema=None) as batch_op:
        batch_op.alter_column('video_id',
               existing_type=sa.UUID(),
               type_=sa.VARCHAR(length=36),
               existing_nullable=False)

    op.drop_table('history')
    # ### end Alembic commands ###

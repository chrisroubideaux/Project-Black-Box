"""Add cascade delete to History table

Revision ID: 690121fb5113
Revises: e5f428efa090
Create Date: 2025-06-08 23:13:57.052245

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '690121fb5113'
down_revision = 'e5f428efa090'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('history', schema=None) as batch_op:
        batch_op.drop_constraint('history_video_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(None, 'videos', ['video_id'], ['id'], ondelete='CASCADE')

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('face_embedding', postgresql.BYTEA(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('face_embedding')

    with op.batch_alter_table('history', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('history_video_id_fkey', 'videos', ['video_id'], ['id'])

    # ### end Alembic commands ###

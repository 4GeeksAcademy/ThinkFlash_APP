"""empty message

Revision ID: 09d8971bd2d4
Revises: 
Create Date: 2023-10-19 10:46:04.143603

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '09d8971bd2d4'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_uuid', sa.String(length=250), nullable=True))
        batch_op.drop_column('uuid')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('uuid', sa.VARCHAR(length=250), nullable=True))
        batch_op.drop_column('user_uuid')

    # ### end Alembic commands ###

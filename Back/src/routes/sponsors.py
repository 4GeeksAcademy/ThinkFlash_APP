from flask import Blueprint, request, jsonify
from ..models import db, Sponsor
# from ..controllers import sponspors_controllers

sponsors =Blueprint('sponsors', __name__)

@sponsors.route('/sponsors', methods=['GET'])
def get_sponsors():
    try:
        sponsors = Sponsor.query.all()
        return jsonify({"message": f'All sponors accessed', "sponsors": [sponsor.serialize() for sponsor in sponsors]}), 200
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
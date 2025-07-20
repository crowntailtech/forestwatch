from flask import Blueprint, request, jsonify
from utils.auth_helper import token_required
from utils.complaint_helper import mark_complaint_as_rejected

moderation_bp = Blueprint('moderation_bp', __name__)

@moderation_bp.route('/complaint/moderation-callback', methods=['POST'])
def moderation_callback():
    data = request.get_json()

    complaint_id = data.get("complaint_id")
    reason = data.get("reason")  # e.g., "Image rejected due to policy violation: Nudity (Confidence: 94%)"

    if not complaint_id or not reason:
        return jsonify({"error": "Missing complaint_id or reason"}), 400

    # Update complaint status and rejection reason in DB
    mark_complaint_as_rejected(complaint_id, reason)

    return jsonify({"message": "Complaint updated with rejection reason"}), 200

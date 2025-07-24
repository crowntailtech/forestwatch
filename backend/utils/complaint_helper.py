from models import db, Complaint

def mark_complaint_as_rejected(complaint_id, reason):
    complaint = Complaint.query.get(complaint_id)
    if complaint:
        complaint.status = "Rejected"
        complaint.rejection_reason = reason
        complaint.image_url = "https://forest-dept-complt-image.s3.us-east-1.amazonaws.com/default/blocked.png"
        db.session.commit()
        return "success"
    else:
        return "fail"

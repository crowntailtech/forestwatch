from models import db, Complaint

def mark_complaint_as_rejected(complaint_id, reason):
    complaint = Complaint.query.get(complaint_id)
    if complaint:
        complaint.status = "Rejected"
        complaint.rejection_reason = reason
        db.session.commit()

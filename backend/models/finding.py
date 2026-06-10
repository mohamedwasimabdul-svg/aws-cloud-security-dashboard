def create_finding(
    severity,
    resource_type,
    resource_id,
    title,
    description
):

    return {
        "severity": severity,
        "resource_type": resource_type,
        "resource_id": resource_id,
        "title": title,
        "description": description
    }
def calculate_score(findings):

    score = 100

    for finding in findings:

        if finding["severity"] == "CRITICAL":
            score -= 10

        elif finding["severity"] == "HIGH":
            score -= 5

        elif finding["severity"] == "MEDIUM":
            score -= 2

    return max(score, 0)
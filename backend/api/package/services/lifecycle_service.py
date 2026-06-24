from services.findings_query_service import (
    get_historical_findings,
    get_all_findings
)


def get_lifecycle():

    historical_findings = (
        get_historical_findings()
    )

    active_findings = (
        get_all_findings()
    )

    active_keys = set()

    #
    # Build lookup of currently active findings
    #
    for finding in active_findings:

        key = (
            finding["resource_id"]
            + "|"
            + finding["title"]
        )

        active_keys.add(key)

    lifecycle = {}

    #
    # Build lifecycle summary
    #
    for finding in historical_findings:

        key = (
            finding["resource_id"]
            + "|"
            + finding["title"]
        )

        created_at = finding.get(
            "created_at",
            ""
        )

        if key not in lifecycle:

            lifecycle[key] = {

                "severity":
                    finding["severity"],

                "resource_type":
                    finding["resource_type"],

                "resource_id":
                    finding["resource_id"],

                "title":
                    finding["title"],

                "first_seen":
                    created_at,

                "last_seen":
                    created_at
            }

        else:

            #
            # Track oldest occurrence
            #
            if (
                created_at
                < lifecycle[key][
                    "first_seen"
                ]
            ):

                lifecycle[key][
                    "first_seen"
                ] = created_at

            #
            # Track newest occurrence
            #
            if (
                created_at
                > lifecycle[key][
                    "last_seen"
                ]
            ):

                lifecycle[key][
                    "last_seen"
                ] = created_at

    results = []

    for key, value in (
        lifecycle.items()
    ):

        status = (
            "ACTIVE"
            if key in active_keys
            else "RESOLVED"
        )

        value["status"] = status

        results.append(value)

    results.sort(
        key=lambda x: x.get(
            "last_seen",
            ""
        ),
        reverse=True
    )

    return results
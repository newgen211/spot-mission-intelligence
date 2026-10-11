// Reference sample records. This file is data, not dashboard logic.
window.SPOT_SAMPLE_DATA = {
  "missions": [
    {
      "id": "M001",
      "v": "V1",
      "status": "COMPLETED",
      "start": "2026-09-01T18:00:00",
      "end": "2026-09-01T18:31:00",
      "dur": 31,
      "b0": 82,
      "b1": 15,
      "acts": [
        {
          "s": 1,
          "ts": "2026-09-01T18:03:06",
          "loc": "WP05",
          "asset": "HX-201",
          "type": "NAVIGATION",
          "bat": 75,
          "ok": false,
          "fail": "OBSTACLE_DETECTION"
        },
        {
          "s": 2,
          "ts": "2026-09-01T18:06:12",
          "loc": "WP10",
          "asset": "PUMP-205",
          "type": "VISUAL_INSPECTION",
          "bat": 69,
          "ok": true,
          "fail": null
        },
        {
          "s": 3,
          "ts": "2026-09-01T18:09:18",
          "loc": "WP10",
          "asset": "PUMP-205",
          "type": "ACOUSTIC_INSPECTION",
          "bat": 62,
          "ok": true,
          "fail": null
        },
        {
          "s": 4,
          "ts": "2026-09-01T18:12:24",
          "loc": "WP09",
          "asset": "PANEL-212",
          "type": "VISUAL_INSPECTION",
          "bat": 55,
          "ok": true,
          "fail": null
        },
        {
          "s": 5,
          "ts": "2026-09-01T18:15:30",
          "loc": "WP01",
          "asset": "PANEL-215",
          "type": "ACOUSTIC_INSPECTION",
          "bat": 48,
          "ok": true,
          "fail": null
        },
        {
          "s": 6,
          "ts": "2026-09-01T18:18:36",
          "loc": "WP12",
          "asset": "VALVE-207",
          "type": "VISUAL_INSPECTION",
          "bat": 42,
          "ok": true,
          "fail": null
        },
        {
          "s": 7,
          "ts": "2026-09-01T18:21:42",
          "loc": "WP15",
          "asset": "PUMP-205",
          "type": "VISUAL_INSPECTION",
          "bat": 35,
          "ok": true,
          "fail": null
        },
        {
          "s": 8,
          "ts": "2026-09-01T18:24:48",
          "loc": "WP07",
          "asset": "PANEL-218",
          "type": "THERMAL_INSPECTION",
          "bat": 28,
          "ok": true,
          "fail": null
        },
        {
          "s": 9,
          "ts": "2026-09-01T18:27:54",
          "loc": "WP03",
          "asset": "HX-208",
          "type": "VISUAL_INSPECTION",
          "bat": 22,
          "ok": false,
          "fail": "SENSOR_TIMEOUT"
        },
        {
          "s": 10,
          "ts": "2026-09-01T18:31:00",
          "loc": "WP05",
          "asset": "HX-204",
          "type": "VISUAL_INSPECTION",
          "bat": 15,
          "ok": true,
          "fail": null
        }
      ],
      "anoms": [
        {
          "s": 9,
          "sev": "HIGH",
          "type": "VISUAL_DEFECT",
          "asset": "HX-208",
          "loc": "WP03",
          "rev": true,
          "onOk": false
        },
        {
          "s": 1,
          "sev": "LOW",
          "type": "NAVIGATION_OBSTRUCTION",
          "asset": "HX-201",
          "loc": "WP05",
          "rev": false,
          "onOk": false
        }
      ],
      "flags": [
        {
          "s": 1,
          "asset": "HX-201",
          "type": "LOCALIZATION_CONFIDENCE_PCT",
          "val": 44.4,
          "unit": "pct",
          "norm": 88.3
        }
      ],
      "brief": "Mission M001 was marked completed. 8 of 10 actions succeeded. Failed: navigation at Pipe Gallery (HX-201); visual inspection at Cooling Loop (HX-208). 2 anomalies recorded, 1 needing review. 1 reading fell outside the normal range for its type. Battery went from 82% to 15%."
    },
    {
      "id": "M002",
      "v": "V1",
      "status": "COMPLETED",
      "start": "2026-09-02T02:00:00",
      "end": "2026-09-02T02:31:00",
      "dur": 31,
      "b0": 79,
      "b1": 28,
      "acts": [
        {
          "s": 1,
          "ts": "2026-09-02T02:03:06",
          "loc": "WP05",
          "asset": "HX-202",
          "type": "NAVIGATION",
          "bat": 74,
          "ok": true,
          "fail": null
        },
        {
          "s": 2,
          "ts": "2026-09-02T02:06:12",
          "loc": "WP14",
          "asset": "MOTOR-206",
          "type": "VISUAL_INSPECTION",
          "bat": 69,
          "ok": true,
          "fail": null
        },
        {
          "s": 3,
          "ts": "2026-09-02T02:09:18",
          "loc": "WP06",
          "asset": "HX-217",
          "type": "ACOUSTIC_INSPECTION",
          "bat": 64,
          "ok": true,
          "fail": null
        },
        {
          "s": 4,
          "ts": "2026-09-02T02:12:24",
          "loc": "WP01",
          "asset": "PANEL-215",
          "type": "NAVIGATION",
          "bat": 59,
          "ok": true,
          "fail": null
        },
        {
          "s": 5,
          "ts": "2026-09-02T02:15:30",
          "loc": "WP13",
          "asset": "HX-219",
          "type": "VISUAL_INSPECTION",
          "bat": 54,
          "ok": true,
          "fail": null
        },
        {
          "s": 6,
          "ts": "2026-09-02T02:18:36",
          "loc": "WP09",
          "asset": "PANEL-211",
          "type": "ACOUSTIC_INSPECTION",
          "bat": 48,
          "ok": false,
          "fail": "READING_UNRELIABLE"
        },
        {
          "s": 7,
          "ts": "2026-09-02T02:21:42",
          "loc": "WP03",
          "asset": "HX-208",
          "type": "GAUGE_READING",
          "bat": 43,
          "ok": true,
          "fail": null
        },
        {
          "s": 8,
          "ts": "2026-09-02T02:24:48",
          "loc": "WP03",
          "asset": "HX-208",
          "type": "GAUGE_READING",
          "bat": 38,
          "ok": true,
          "fail": null
        },
        {
          "s": 9,
          "ts": "2026-09-02T02:27:54",
          "loc": "WP11",
          "asset": "HX-210",
          "type": "ACOUSTIC_INSPECTION",
          "bat": 33,
          "ok": true,
          "fail": null
        },
        {
          "s": 10,
          "ts": "2026-09-02T02:31:00",
          "loc": "WP05",
          "asset": "PANEL-203",
          "type": "VISUAL_INSPECTION",
          "bat": 28,
          "ok": true,
          "fail": null
        }
      ],
      "anoms": [
        {
          "s": 6,
          "sev": "MEDIUM",
          "type": "ABNORMAL_VIBRATION",
          "asset": "PANEL-211",
          "loc": "WP09",
          "rev": false,
          "onOk": false
        }
      ],
      "flags": [],
      "brief": "Mission M002 was marked completed. 9 of 10 actions succeeded. Failed: acoustic inspection at Turbine Hall South (PANEL-211). 1 anomaly recorded, 0 needing review. Battery went from 79% to 28%."
    },
    {
      "id": "M003",
      "v": "V1",
      "status": "COMPLETED",
      "start": "2026-09-02T10:00:00",
      "end": "2026-09-02T10:28:00",
      "dur": 28,
      "b0": 75,
      "b1": 17,
      "acts": [
        {
          "s": 1,
          "ts": "2026-09-02T10:02:48",
          "loc": "WP05",
          "asset": "PANEL-203",
          "type": "NAVIGATION",
          "bat": 69,
          "ok": true,
          "fail": null
        },
        {
          "s": 2,
          "ts": "2026-09-02T10:05:36",
          "loc": "WP04",
          "asset": "COMP-214",
          "type": "THERMAL_INSPECTION",
          "bat": 63,
          "ok": true,
          "fail": null
        },
        {
          "s": 3,
          "ts": "2026-09-02T10:08:24",
          "loc": "WP10",
          "asset": "PUMP-205",
          "type": "THERMAL_INSPECTION",
          "bat": 58,
          "ok": true,
          "fail": null
        },
        {
          "s": 4,
          "ts": "2026-09-02T10:11:12",
          "loc": "WP11",
          "asset": "HX-210",
          "type": "NAVIGATION",
          "bat": 52,
          "ok": true,
          "fail": null
        },
        {
          "s": 5,
          "ts": "2026-09-02T10:14:00",
          "loc": "WP10",
          "asset": "PUMP-205",
          "type": "THERMAL_INSPECTION",
          "bat": 46,
          "ok": true,
          "fail": null
        },
        {
          "s": 6,
          "ts": "2026-09-02T10:16:48",
          "loc": "WP11",
          "asset": "HX-210",
          "type": "NAVIGATION",
          "bat": 40,
          "ok": true,
          "fail": null
        },
        {
          "s": 7,
          "ts": "2026-09-02T10:19:36",
          "loc": "WP07",
          "asset": "HX-210",
          "type": "NAVIGATION",
          "bat": 34,
          "ok": true,
          "fail": null
        },
        {
          "s": 8,
          "ts": "2026-09-02T10:22:24",
          "loc": "WP15",
          "asset": "HX-201",
          "type": "THERMAL_INSPECTION",
          "bat": 29,
          "ok": false,
          "fail": "TARGET_NOT_DETECTED"
        },
        {
          "s": 9,
          "ts": "2026-09-02T10:25:12",
          "loc": "WP05",
          "asset": "HX-204",
          "type": "THERMAL_INSPECTION",
          "bat": 23,
          "ok": false,
          "fail": "TARGET_NOT_DETECTED"
        },
        {
          "s": 10,
          "ts": "2026-09-02T10:28:00",
          "loc": "WP04",
          "asset": "COMP-214",
          "type": "GAUGE_READING",
          "bat": 17,
          "ok": false,
          "fail": "SENSOR_TIMEOUT"
        }
      ],
      "anoms": [
        {
          "s": 8,
          "sev": "MEDIUM",
          "type": "ABNORMAL_TEMPERATURE",
          "asset": "HX-201",
          "loc": "WP15",
          "rev": false,
          "onOk": false
        },
        {
          "s": 9,
          "sev": "LOW",
          "type": "ABNORMAL_TEMPERATURE",
          "asset": "HX-204",
          "loc": "WP05",
          "rev": false,
          "onOk": false
        }
      ],
      "flags": [],
      "brief": "Mission M003 was marked completed. 7 of 10 actions succeeded. Failed: thermal inspection at Inspection Dock (HX-201); thermal inspection at Pipe Gallery (HX-204); gauge reading at Pump Bay (COMP-214). 2 anomalies recorded, 0 needing review. Battery went from 75% to 17%."
    },
    {
      "id": "M004",
      "v": "V1",
      "status": "COMPLETED",
      "start": "2026-09-02T18:00:00",
      "end": "2026-09-02T18:30:00",
      "dur": 30,
      "b0": 81,
      "b1": 27,
      "acts": [
        {
          "s": 1,
          "ts": "2026-09-02T18:03:00",
          "loc": "WP05",
          "asset": "HX-204",
          "type": "NAVIGATION",
          "bat": 76,
          "ok": false,
          "fail": "COMMUNICATION_LOSS"
        },
        {
          "s": 2,
          "ts": "2026-09-02T18:06:00",
          "loc": "WP11",
          "asset": "HX-210",
          "type": "VISUAL_INSPECTION",
          "bat": 70,
          "ok": true,
          "fail": null
        },
        {
          "s": 3,
          "ts": "2026-09-02T18:09:00",
          "loc": "WP07",
          "asset": "HX-213",
          "type": "THERMAL_INSPECTION",
          "bat": 65,
          "ok": true,
          "fail": null
        },
        {
          "s": 4,
          "ts": "2026-09-02T18:12:00",
          "loc": "WP13",
          "asset": "HX-213",
          "type": "VISUAL_INSPECTION",
          "bat": 59,
          "ok": true,
          "fail": null
        },
        {
          "s": 5,
          "ts": "2026-09-02T18:15:00",
          "loc": "WP11",
          "asset": "HX-210",
          "type": "NAVIGATION",
          "bat": 54,
          "ok": true,
          "fail": null
        },
        {
          "s": 6,
          "ts": "2026-09-02T18:18:00",
          "loc": "WP01",
          "asset": "PANEL-215",
          "type": "THERMAL_INSPECTION",
          "bat": 49,
          "ok": true,
          "fail": null
        },
        {
          "s": 7,
          "ts": "2026-09-02T18:21:00",
          "loc": "WP06",
          "asset": "HX-217",
          "type": "NAVIGATION",
          "bat": 43,
          "ok": true,
          "fail": null
        },
        {
          "s": 8,
          "ts": "2026-09-02T18:24:00",
          "loc": "WP09",
          "asset": "PANEL-211",
          "type": "GAUGE_READING",
          "bat": 38,
          "ok": false,
          "fail": "SENSOR_TIMEOUT"
        },
        {
          "s": 9,
          "ts": "2026-09-02T18:27:00",
          "loc": "WP06",
          "asset": "HX-217",
          "type": "VISUAL_INSPECTION",
          "bat": 32,
          "ok": true,
          "fail": null
        },
        {
          "s": 10,
          "ts": "2026-09-02T18:30:00",
          "loc": "WP08",
          "asset": "HX-202",
          "type": "NAVIGATION",
          "bat": 27,
          "ok": true,
          "fail": null
        }
      ],
      "anoms": [
        {
          "s": 7,
          "sev": "HIGH",
          "type": "LOCALIZATION_ISSUE",
          "asset": "HX-217",
          "loc": "WP06",
          "rev": true,
          "onOk": true
        },
        {
          "s": 8,
          "sev": "MEDIUM",
          "type": "GAUGE_OUT_OF_RANGE",
          "asset": "PANEL-211",
          "loc": "WP09",
          "rev": false,
          "onOk": false
        },
        {
          "s": 1,
          "sev": "LOW",
          "type": "NAVIGATION_OBSTRUCTION",
          "asset": "HX-204",
          "loc": "WP05",
          "rev": false,
          "onOk": false
        }
      ],
      "flags": [
        {
          "s": 1,
          "asset": "HX-204",
          "type": "LOCALIZATION_CONFIDENCE_PCT",
          "val": 66.2,
          "unit": "pct",
          "norm": 88.3
        }
      ],
      "brief": "Mission M004 was marked completed. 8 of 10 actions succeeded. Failed: navigation at Pipe Gallery (HX-204); gauge reading at Turbine Hall South (PANEL-211). 3 anomalies recorded, 1 needing review, 1 on an action that reported success. 1 reading fell outside the normal range for its type. Battery went from 81% to 27%."
    },
    {
      "id": "M005",
      "v": "V1",
      "status": "COMPLETED",
      "start": "2026-09-03T02:00:00",
      "end": "2026-09-03T02:25:00",
      "dur": 25,
      "b0": 78,
      "b1": 20,
      "acts": [
        {
          "s": 1,
          "ts": "2026-09-03T02:02:30",
          "loc": "WP05",
          "asset": "HX-201",
          "type": "NAVIGATION",
          "bat": 72,
          "ok": true,
          "fail": null
        },
        {
          "s": 2,
          "ts": "2026-09-03T02:05:00",
          "loc": "WP06",
          "asset": "HX-217",
          "type": "THERMAL_INSPECTION",
          "bat": 66,
          "ok": true,
          "fail": null
        },
        {
          "s": 3,
          "ts": "2026-09-03T02:07:30",
          "loc": "WP09",
          "asset": "PANEL-212",
          "type": "NAVIGATION",
          "bat": 61,
          "ok": true,
          "fail": null
        },
        {
          "s": 4,
          "ts": "2026-09-03T02:10:00",
          "loc": "WP04",
          "asset": "COMP-214",
          "type": "ACOUSTIC_INSPECTION",
          "bat": 55,
          "ok": true,
          "fail": null
        },
        {
          "s": 5,
          "ts": "2026-09-03T02:12:30",
          "loc": "WP06",
          "asset": "HX-217",
          "type": "GAUGE_READING",
          "bat": 49,
          "ok": true,
          "fail": null
        },
        {
          "s": 6,
          "ts": "2026-09-03T02:15:00",
          "loc": "WP05",
          "asset": "PANEL-203",
          "type": "ACOUSTIC_INSPECTION",
          "bat": 43,
          "ok": true,
          "fail": null
        },
        {
          "s": 7,
          "ts": "2026-09-03T02:17:30",
          "loc": "WP15",
          "asset": "HX-201",
          "type": "ACOUSTIC_INSPECTION",
          "bat": 37,
          "ok": true,
          "fail": null
        },
        {
          "s": 8,
          "ts": "2026-09-03T02:20:00",
          "loc": "WP04",
          "asset": "COMP-214",
          "type": "NAVIGATION",
          "bat": 32,
          "ok": true,
          "fail": null
        },
        {
          "s": 9,
          "ts": "2026-09-03T02:22:30",
          "loc": "WP13",
          "asset": "HX-219",
          "type": "GAUGE_READING",
          "bat": 26,
          "ok": true,
          "fail": null
        },
        {
          "s": 10,
          "ts": "2026-09-03T02:25:00",
          "loc": "WP03",
          "asset": "HX-208",
          "type": "THERMAL_INSPECTION",
          "bat": 20,
          "ok": true,
          "fail": null
        }
      ],
      "anoms": [],
      "flags": [],
      "brief": "Mission M005 was marked completed. All 10 actions succeeded. Battery went from 78% to 20%."
    },
    {
      "id": "M006",
      "v": "V1",
      "status": "COMPLETED",
      "start": "2026-09-03T10:00:00",
      "end": "2026-09-03T10:31:00",
      "dur": 31,
      "b0": 73,
      "b1": 15,
      "acts": [
        {
          "s": 1,
          "ts": "2026-09-03T10:03:06",
          "loc": "WP05",
          "asset": "HX-202",
          "type": "NAVIGATION",
          "bat": 67,
          "ok": true,
          "fail": null
        },
        {
          "s": 2,
          "ts": "2026-09-03T10:06:12",
          "loc": "WP05",
          "asset": "PANEL-203",
          "type": "VISUAL_INSPECTION",
          "bat": 61,
          "ok": true,
          "fail": null
        },
        {
          "s": 3,
          "ts": "2026-09-03T10:09:18",
          "loc": "WP01",
          "asset": "PANEL-215",
          "type": "NAVIGATION",
          "bat": 56,
          "ok": true,
          "fail": null
        },
        {
          "s": 4,
          "ts": "2026-09-03T10:12:24",
          "loc": "WP03",
          "asset": "HX-208",
          "type": "VISUAL_INSPECTION",
          "bat": 50,
          "ok": true,
          "fail": null
        },
        {
          "s": 5,
          "ts": "2026-09-03T10:15:30",
          "loc": "WP01",
          "asset": "PANEL-215",
          "type": "ACOUSTIC_INSPECTION",
          "bat": 44,
          "ok": false,
          "fail": "SENSOR_TIMEOUT"
        },
        {
          "s": 6,
          "ts": "2026-09-03T10:18:36",
          "loc": "WP14",
          "asset": "GAUGE-209",
          "type": "VISUAL_INSPECTION",
          "bat": 38,
          "ok": true,
          "fail": null
        },
        {
          "s": 7,
          "ts": "2026-09-03T10:21:42",
          "loc": "WP03",
          "asset": "HX-208",
          "type": "VISUAL_INSPECTION",
          "bat": 32,
          "ok": false,
          "fail": "READING_UNRELIABLE"
        },
        {
          "s": 8,
          "ts": "2026-09-03T10:24:48",
          "loc": "WP14",
          "asset": "PUMP-220",
          "type": "VISUAL_INSPECTION",
          "bat": 27,
          "ok": true,
          "fail": null
        },
        {
          "s": 9,
          "ts": "2026-09-03T10:27:54",
          "loc": "WP11",
          "asset": "HX-210",
          "type": "THERMAL_INSPECTION",
          "bat": 21,
          "ok": true,
          "fail": null
        },
        {
          "s": 10,
          "ts": "2026-09-03T10:31:00",
          "loc": "WP09",
          "asset": "PANEL-211",
          "type": "GAUGE_READING",
          "bat": 15,
          "ok": false,
          "fail": "READING_UNRELIABLE"
        }
      ],
      "anoms": [
        {
          "s": 10,
          "sev": "CRITICAL",
          "type": "GAUGE_OUT_OF_RANGE",
          "asset": "PANEL-211",
          "loc": "WP09",
          "rev": true,
          "onOk": false
        },
        {
          "s": 7,
          "sev": "MEDIUM",
          "type": "VISUAL_DEFECT",
          "asset": "HX-208",
          "loc": "WP03",
          "rev": false,
          "onOk": false
        },
        {
          "s": 5,
          "sev": "MEDIUM",
          "type": "ABNORMAL_VIBRATION",
          "asset": "PANEL-215",
          "loc": "WP01",
          "rev": false,
          "onOk": false
        }
      ],
      "flags": [],
      "brief": "Mission M006 was marked completed. 7 of 10 actions succeeded. Failed: acoustic inspection at Main Entrance (PANEL-215); visual inspection at Cooling Loop (HX-208); gauge reading at Turbine Hall South (PANEL-211). 3 anomalies recorded, 1 needing review. Battery went from 73% to 15%."
    },
    {
      "id": "M007",
      "v": "V1",
      "status": "COMPLETED",
      "start": "2026-09-03T18:00:00",
      "end": "2026-09-03T18:27:00",
      "dur": 27,
      "b0": 79,
      "b1": 25,
      "acts": [
        {
          "s": 1,
          "ts": "2026-09-03T18:02:42",
          "loc": "WP05",
          "asset": "PANEL-203",
          "type": "NAVIGATION",
          "bat": 74,
          "ok": false,
          "fail": "LOCALIZATION_FAILURE"
        },
        {
          "s": 2,
          "ts": "2026-09-03T18:05:24",
          "loc": "WP05",
          "asset": "HX-202",
          "type": "VISUAL_INSPECTION",
          "bat": 68,
          "ok": true,
          "fail": null
        },
        {
          "s": 3,
          "ts": "2026-09-03T18:08:06",
          "loc": "WP06",
          "asset": "HX-217",
          "type": "NAVIGATION",
          "bat": 63,
          "ok": true,
          "fail": null
        },
        {
          "s": 4,
          "ts": "2026-09-03T18:10:48",
          "loc": "WP07",
          "asset": "PANEL-211",
          "type": "VISUAL_INSPECTION",
          "bat": 57,
          "ok": true,
          "fail": null
        },
        {
          "s": 5,
          "ts": "2026-09-03T18:13:30",
          "loc": "WP14",
          "asset": "PUMP-220",
          "type": "NAVIGATION",
          "bat": 52,
          "ok": true,
          "fail": null
        },
        {
          "s": 6,
          "ts": "2026-09-03T18:16:12",
          "loc": "WP07",
          "asset": "HX-219",
          "type": "THERMAL_INSPECTION",
          "bat": 47,
          "ok": true,
          "fail": null
        },
        {
          "s": 7,
          "ts": "2026-09-03T18:18:54",
          "loc": "WP11",
          "asset": "HX-210",
          "type": "THERMAL_INSPECTION",
          "bat": 41,
          "ok": true,
          "fail": null
        },
        {
          "s": 8,
          "ts": "2026-09-03T18:21:36",
          "loc": "WP06",
          "asset": "HX-217",
          "type": "NAVIGATION",
          "bat": 36,
          "ok": true,
          "fail": null
        },
        {
          "s": 9,
          "ts": "2026-09-03T18:24:18",
          "loc": "WP09",
          "asset": "PANEL-212",
          "type": "VISUAL_INSPECTION",
          "bat": 30,
          "ok": true,
          "fail": null
        },
        {
          "s": 10,
          "ts": "2026-09-03T18:27:00",
          "loc": "WP05",
          "asset": "PANEL-203",
          "type": "ACOUSTIC_INSPECTION",
          "bat": 25,
          "ok": false,
          "fail": "SENSOR_TIMEOUT"
        }
      ],
      "anoms": [
        {
          "s": 1,
          "sev": "CRITICAL",
          "type": "SIGNAL_DEGRADATION",
          "asset": "PANEL-203",
          "loc": "WP05",
          "rev": true,
          "onOk": false
        },
        {
          "s": 10,
          "sev": "LOW",
          "type": "ABNORMAL_VIBRATION",
          "asset": "PANEL-203",
          "loc": "WP05",
          "rev": false,
          "onOk": false
        }
      ],
      "flags": [
        {
          "s": 1,
          "asset": "PANEL-203",
          "type": "LOCALIZATION_CONFIDENCE_PCT",
          "val": 49.2,
          "unit": "pct",
          "norm": 88.3
        }
      ],
      "brief": "Mission M007 was marked completed. 8 of 10 actions succeeded. Failed: navigation at Pipe Gallery (PANEL-203); acoustic inspection at Pipe Gallery (PANEL-203). 2 anomalies recorded, 1 needing review. 1 reading fell outside the normal range for its type. Battery went from 79% to 25%."
    },
    {
      "id": "M008",
      "v": "V1",
      "status": "COMPLETED",
      "start": "2026-09-04T02:00:00",
      "end": "2026-09-04T02:26:00",
      "dur": 26,
      "b0": 75,
      "b1": 12,
      "acts": [
        {
          "s": 1,
          "ts": "2026-09-04T02:02:36",
          "loc": "WP05",
          "asset": "HX-204",
          "type": "NAVIGATION",
          "bat": 69,
          "ok": true,
          "fail": null
        },
        {
          "s": 2,
          "ts": "2026-09-04T02:05:12",
          "loc": "WP15",
          "asset": "PANEL-218",
          "type": "ACOUSTIC_INSPECTION",
          "bat": 62,
          "ok": true,
          "fail": null
        },
        {
          "s": 3,
          "ts": "2026-09-04T02:07:48",
          "loc": "WP06",
          "asset": "HX-217",
          "type": "NAVIGATION",
          "bat": 56,
          "ok": true,
          "fail": null
        },
        {
          "s": 4,
          "ts": "2026-09-04T02:10:24",
          "loc": "WP05",
          "asset": "PANEL-203",
          "type": "VISUAL_INSPECTION",
          "bat": 50,
          "ok": true,
          "fail": null
        },
        {
          "s": 5,
          "ts": "2026-09-04T02:13:00",
          "loc": "WP07",
          "asset": "HX-216",
          "type": "NAVIGATION",
          "bat": 44,
          "ok": true,
          "fail": null
        },
        {
          "s": 6,
          "ts": "2026-09-04T02:15:36",
          "loc": "WP01",
          "asset": "PANEL-215",
          "type": "ACOUSTIC_INSPECTION",
          "bat": 37,
          "ok": false,
          "fail": "READING_UNRELIABLE"
        },
        {
          "s": 7,
          "ts": "2026-09-04T02:18:12",
          "loc": "WP01",
          "asset": "PANEL-215",
          "type": "GAUGE_READING",
          "bat": 31,
          "ok": true,
          "fail": null
        },
        {
          "s": 8,
          "ts": "2026-09-04T02:20:48",
          "loc": "WP11",
          "asset": "HX-210",
          "type": "VISUAL_INSPECTION",
          "bat": 25,
          "ok": true,
          "fail": null
        },
        {
          "s": 9,
          "ts": "2026-09-04T02:23:24",
          "loc": "WP02",
          "asset": "PUMP-205",
          "type": "THERMAL_INSPECTION",
          "bat": 18,
          "ok": false,
          "fail": "READING_UNRELIABLE"
        },
        {
          "s": 10,
          "ts": "2026-09-04T02:26:00",
          "loc": "WP04",
          "asset": "COMP-214",
          "type": "GAUGE_READING",
          "bat": 12,
          "ok": false,
          "fail": "READING_UNRELIABLE"
        }
      ],
      "anoms": [
        {
          "s": 6,
          "sev": "MEDIUM",
          "type": "ABNORMAL_VIBRATION",
          "asset": "PANEL-215",
          "loc": "WP01",
          "rev": false,
          "onOk": false
        }
      ],
      "flags": [],
      "brief": "Mission M008 was marked completed. 7 of 10 actions succeeded. Failed: acoustic inspection at Main Entrance (PANEL-215); thermal inspection at Electrical Room (PUMP-205); gauge reading at Pump Bay (COMP-214). 1 anomaly recorded, 0 needing review. Battery went from 75% to 12%."
    },
    {
      "id": "M009",
      "v": "V1",
      "status": "COMPLETED",
      "start": "2026-09-04T10:00:00",
      "end": "2026-09-04T10:25:00",
      "dur": 25,
      "b0": 68,
      "b1": 26,
      "acts": [
        {
          "s": 1,
          "ts": "2026-09-04T10:02:30",
          "loc": "WP05",
          "asset": "HX-201",
          "type": "NAVIGATION",
          "bat": 64,
          "ok": true,
          "fail": null
        },
        {
          "s": 2,
          "ts": "2026-09-04T10:05:00",
          "loc": "WP01",
          "asset": "PANEL-215",
          "type": "ACOUSTIC_INSPECTION",
          "bat": 60,
          "ok": true,
          "fail": null
        },
        {
          "s": 3,
          "ts": "2026-09-04T10:07:30",
          "loc": "WP15",
          "asset": "HX-216",
          "type": "GAUGE_READING",
          "bat": 55,
          "ok": true,
          "fail": null
        },
        {
          "s": 4,
          "ts": "2026-09-04T10:10:00",
          "loc": "WP06",
          "asset": "HX-217",
          "type": "THERMAL_INSPECTION",
          "bat": 51,
          "ok": true,
          "fail": null
        },
        {
          "s": 5,
          "ts": "2026-09-04T10:12:30",
          "loc": "WP11",
          "asset": "HX-210",
          "type": "VISUAL_INSPECTION",
          "bat": 47,
          "ok": true,
          "fail": null
        },
        {
          "s": 6,
          "ts": "2026-09-04T10:15:00",
          "loc": "WP05",
          "asset": "HX-204",
          "type": "VISUAL_INSPECTION",
          "bat": 43,
          "ok": false,
          "fail": "TARGET_NOT_DETECTED"
        },
        {
          "s": 7,
          "ts": "2026-09-04T10:17:30",
          "loc": "WP05",
          "asset": "HX-202",
          "type": "ACOUSTIC_INSPECTION",
          "bat": 39,
          "ok": true,
          "fail": null
        },
        {
          "s": 8,
          "ts": "2026-09-04T10:20:00",
          "loc": "WP11",
          "asset": "HX-210",
          "type": "NAVIGATION",
          "bat": 34,
          "ok": true,
          "fail": null
        },
        {
          "s": 9,
          "ts": "2026-09-04T10:22:30",
          "loc": "WP09",
          "asset": "PANEL-212",
          "type": "ACOUSTIC_INSPECTION",
          "bat": 30,
          "ok": false,
          "fail": "SIGNAL_NOISE"
        },
        {
          "s": 10,
          "ts": "2026-09-04T10:25:00",
          "loc": "WP02",
          "asset": "PANEL-218",
          "type": "NAVIGATION",
          "bat": 26,
          "ok": false,
          "fail": "COMMUNICATION_LOSS"
        }
      ],
      "anoms": [
        {
          "s": 5,
          "sev": "HIGH",
          "type": "VISUAL_DEFECT",
          "asset": "HX-210",
          "loc": "WP11",
          "rev": true,
          "onOk": true
        }
      ],
      "flags": [
        {
          "s": 10,
          "asset": "PANEL-218",
          "type": "LOCALIZATION_CONFIDENCE_PCT",
          "val": 55.6,
          "unit": "pct",
          "norm": 88.3
        }
      ],
      "brief": "Mission M009 was marked completed. 7 of 10 actions succeeded. Failed: visual inspection at Pipe Gallery (HX-204); acoustic inspection at Turbine Hall South (PANEL-212); navigation at Electrical Room (PANEL-218). 1 anomaly recorded, 1 needing review, 1 on an action that reported success. 1 reading fell outside the normal range for its type. Battery went from 68% to 26%."
    },
    {
      "id": "M010",
      "v": "V1",
      "status": "COMPLETED",
      "start": "2026-09-04T18:00:00",
      "end": "2026-09-04T18:33:00",
      "dur": 33,
      "b0": 76,
      "b1": 14,
      "acts": [
        {
          "s": 1,
          "ts": "2026-09-04T18:03:18",
          "loc": "WP05",
          "asset": "HX-202",
          "type": "NAVIGATION",
          "bat": 70,
          "ok": false,
          "fail": "LOCALIZATION_FAILURE"
        },
        {
          "s": 2,
          "ts": "2026-09-04T18:06:36",
          "loc": "WP15",
          "asset": "PUMP-220",
          "type": "NAVIGATION",
          "bat": 64,
          "ok": true,
          "fail": null
        },
        {
          "s": 3,
          "ts": "2026-09-04T18:09:54",
          "loc": "WP04",
          "asset": "COMP-214",
          "type": "ACOUSTIC_INSPECTION",
          "bat": 57,
          "ok": false,
          "fail": "READING_UNRELIABLE"
        },
        {
          "s": 4,
          "ts": "2026-09-04T18:13:12",
          "loc": "WP04",
          "asset": "COMP-214",
          "type": "GAUGE_READING",
          "bat": 51,
          "ok": true,
          "fail": null
        },
        {
          "s": 5,
          "ts": "2026-09-04T18:16:30",
          "loc": "WP09",
          "asset": "PANEL-212",
          "type": "THERMAL_INSPECTION",
          "bat": 45,
          "ok": true,
          "fail": null
        },
        {
          "s": 6,
          "ts": "2026-09-04T18:19:48",
          "loc": "WP10",
          "asset": "PUMP-205",
          "type": "VISUAL_INSPECTION",
          "bat": 39,
          "ok": true,
          "fail": null
        },
        {
          "s": 7,
          "ts": "2026-09-04T18:23:06",
          "loc": "WP12",
          "asset": "VALVE-207",
          "type": "VISUAL_INSPECTION",
          "bat": 33,
          "ok": true,
          "fail": null
        },
        {
          "s": 8,
          "ts": "2026-09-04T18:26:24",
          "loc": "WP01",
          "asset": "PANEL-215",
          "type": "THERMAL_INSPECTION",
          "bat": 26,
          "ok": true,
          "fail": null
        },
        {
          "s": 9,
          "ts": "2026-09-04T18:29:42",
          "loc": "WP03",
          "asset": "HX-208",
          "type": "NAVIGATION",
          "bat": 20,
          "ok": false,
          "fail": "PATH_BLOCKED"
        },
        {
          "s": 10,
          "ts": "2026-09-04T18:33:00",
          "loc": "WP03",
          "asset": "HX-208",
          "type": "GAUGE_READING",
          "bat": 14,
          "ok": true,
          "fail": null
        }
      ],
      "anoms": [],
      "flags": [
        {
          "s": 9,
          "asset": "HX-208",
          "type": "LOCALIZATION_CONFIDENCE_PCT",
          "val": 37.5,
          "unit": "pct",
          "norm": 88.3
        },
        {
          "s": 1,
          "asset": "HX-202",
          "type": "LOCALIZATION_CONFIDENCE_PCT",
          "val": 67.1,
          "unit": "pct",
          "norm": 88.3
        }
      ],
      "brief": "Mission M010 was marked completed. 7 of 10 actions succeeded. Failed: navigation at Pipe Gallery (HX-202); acoustic inspection at Pump Bay (COMP-214); navigation at Cooling Loop (HX-208). 2 readings fell outside the normal range for its type. Battery went from 76% to 14%."
    },
    {
      "id": "M011",
      "v": "V1",
      "status": "COMPLETED",
      "start": "2026-09-05T02:00:00",
      "end": "2026-09-05T02:33:00",
      "dur": 33,
      "b0": 80,
      "b1": 18,
      "acts": [
        {
          "s": 1,
          "ts": "2026-09-05T02:03:18",
          "loc": "WP05",
          "asset": "PANEL-203",
          "type": "NAVIGATION",
          "bat": 74,
          "ok": true,
          "fail": null
        },
        {
          "s": 2,
          "ts": "2026-09-05T02:06:36",
          "loc": "WP05",
          "asset": "HX-202",
          "type": "ACOUSTIC_INSPECTION",
          "bat": 68,
          "ok": true,
          "fail": null
        },
        {
          "s": 3,
          "ts": "2026-09-05T02:09:54",
          "loc": "WP11",
          "asset": "HX-210",
          "type": "VISUAL_INSPECTION",
          "bat": 61,
          "ok": true,
          "fail": null
        },
        {
          "s": 4,
          "ts": "2026-09-05T02:13:12",
          "loc": "WP01",
          "asset": "PANEL-215",
          "type": "VISUAL_INSPECTION",
          "bat": 55,
          "ok": true,
          "fail": null
        },
        {
          "s": 5,
          "ts": "2026-09-05T02:16:30",
          "loc": "WP14",
          "asset": "PUMP-220",
          "type": "GAUGE_READING",
          "bat": 49,
          "ok": true,
          "fail": null
        },
        {
          "s": 6,
          "ts": "2026-09-05T02:19:48",
          "loc": "WP03",
          "asset": "HX-208",
          "type": "NAVIGATION",
          "bat": 43,
          "ok": true,
          "fail": null
        },
        {
          "s": 7,
          "ts": "2026-09-05T02:23:06",
          "loc": "WP04",
          "asset": "COMP-214",
          "type": "THERMAL_INSPECTION",
          "bat": 37,
          "ok": true,
          "fail": null
        },
        {
          "s": 8,
          "ts": "2026-09-05T02:26:24",
          "loc": "WP04",
          "asset": "COMP-214",
          "type": "VISUAL_INSPECTION",
          "bat": 30,
          "ok": true,
          "fail": null
        },
        {
          "s": 9,
          "ts": "2026-09-05T02:29:42",
          "loc": "WP08",
          "asset": "PANEL-212",
          "type": "GAUGE_READING",
          "bat": 24,
          "ok": false,
          "fail": "SENSOR_TIMEOUT"
        },
        {
          "s": 10,
          "ts": "2026-09-05T02:33:00",
          "loc": "WP15",
          "asset": "PANEL-218",
          "type": "ACOUSTIC_INSPECTION",
          "bat": 18,
          "ok": false,
          "fail": "READING_UNRELIABLE"
        }
      ],
      "anoms": [],
      "flags": [],
      "brief": "Mission M011 was marked completed. 8 of 10 actions succeeded. Failed: gauge reading at Turbine Hall North (PANEL-212); acoustic inspection at Inspection Dock (PANEL-218). Battery went from 80% to 18%."
    },
    {
      "id": "M012",
      "v": "V1",
      "status": "COMPLETED",
      "start": "2026-09-05T10:00:00",
      "end": "2026-09-05T10:27:00",
      "dur": 27,
      "b0": 69,
      "b1": 13,
      "acts": [
        {
          "s": 1,
          "ts": "2026-09-05T10:02:42",
          "loc": "WP05",
          "asset": "HX-204",
          "type": "NAVIGATION",
          "bat": 63,
          "ok": true,
          "fail": null
        },
        {
          "s": 2,
          "ts": "2026-09-05T10:05:24",
          "loc": "WP12",
          "asset": "VALVE-207",
          "type": "VISUAL_INSPECTION",
          "bat": 58,
          "ok": true,
          "fail": null
        },
        {
          "s": 3,
          "ts": "2026-09-05T10:08:06",
          "loc": "WP04",
          "asset": "COMP-214",
          "type": "VISUAL_INSPECTION",
          "bat": 52,
          "ok": true,
          "fail": null
        },
        {
          "s": 4,
          "ts": "2026-09-05T10:10:48",
          "loc": "WP13",
          "asset": "HX-216",
          "type": "THERMAL_INSPECTION",
          "bat": 47,
          "ok": true,
          "fail": null
        },
        {
          "s": 5,
          "ts": "2026-09-05T10:13:30",
          "loc": "WP08",
          "asset": "HX-217",
          "type": "ACOUSTIC_INSPECTION",
          "bat": 41,
          "ok": true,
          "fail": null
        },
        {
          "s": 6,
          "ts": "2026-09-05T10:16:12",
          "loc": "WP08",
          "asset": "PUMP-205",
          "type": "VISUAL_INSPECTION",
          "bat": 35,
          "ok": true,
          "fail": null
        },
        {
          "s": 7,
          "ts": "2026-09-05T10:18:54",
          "loc": "WP06",
          "asset": "HX-217",
          "type": "THERMAL_INSPECTION",
          "bat": 30,
          "ok": true,
          "fail": null
        },
        {
          "s": 8,
          "ts": "2026-09-05T10:21:36",
          "loc": "WP15",
          "asset": "PANEL-218",
          "type": "THERMAL_INSPECTION",
          "bat": 24,
          "ok": false,
          "fail": "SENSOR_TIMEOUT"
        },
        {
          "s": 9,
          "ts": "2026-09-05T10:24:18",
          "loc": "WP08",
          "asset": "PANEL-215",
          "type": "THERMAL_INSPECTION",
          "bat": 19,
          "ok": false,
          "fail": "READING_UNRELIABLE"
        },
        {
          "s": 10,
          "ts": "2026-09-05T10:27:00",
          "loc": "WP02",
          "asset": "GAUGE-209",
          "type": "THERMAL_INSPECTION",
          "bat": 13,
          "ok": false,
          "fail": "READING_UNRELIABLE"
        }
      ],
      "anoms": [
        {
          "s": 8,
          "sev": "MEDIUM",
          "type": "ABNORMAL_TEMPERATURE",
          "asset": "PANEL-218",
          "loc": "WP15",
          "rev": false,
          "onOk": false
        },
        {
          "s": 9,
          "sev": "MEDIUM",
          "type": "ABNORMAL_TEMPERATURE",
          "asset": "PANEL-215",
          "loc": "WP08",
          "rev": false,
          "onOk": false
        },
        {
          "s": 10,
          "sev": "LOW",
          "type": "ABNORMAL_TEMPERATURE",
          "asset": "GAUGE-209",
          "loc": "WP02",
          "rev": false,
          "onOk": false
        }
      ],
      "flags": [],
      "brief": "Mission M012 was marked completed. 7 of 10 actions succeeded. Failed: thermal inspection at Inspection Dock (PANEL-218); thermal inspection at Turbine Hall North (PANEL-215); thermal inspection at Electrical Room (GAUGE-209). 3 anomalies recorded, 0 needing review. Battery went from 69% to 13%."
    },
    {
      "id": "M013",
      "v": "V1",
      "status": "COMPLETED",
      "start": "2026-09-05T18:00:00",
      "end": "2026-09-05T18:32:00",
      "dur": 32,
      "b0": 72,
      "b1": 23,
      "acts": [
        {
          "s": 1,
          "ts": "2026-09-05T18:03:12",
          "loc": "WP05",
          "asset": "HX-201",
          "type": "NAVIGATION",
          "bat": 67,
          "ok": false,
          "fail": "LOCALIZATION_FAILURE"
        },
        {
          "s": 2,
          "ts": "2026-09-05T18:06:24",
          "loc": "WP13",
          "asset": "HX-219",
          "type": "GAUGE_READING",
          "bat": 62,
          "ok": true,
          "fail": null
        },
        {
          "s": 3,
          "ts": "2026-09-05T18:09:36",
          "loc": "WP09",
          "asset": "PANEL-211",
          "type": "VISUAL_INSPECTION",
          "bat": 57,
          "ok": true,
          "fail": null
        },
        {
          "s": 4,
          "ts": "2026-09-05T18:12:48",
          "loc": "WP02",
          "asset": "HX-213",
          "type": "VISUAL_INSPECTION",
          "bat": 52,
          "ok": true,
          "fail": null
        },
        {
          "s": 5,
          "ts": "2026-09-05T18:16:00",
          "loc": "WP01",
          "asset": "PANEL-215",
          "type": "GAUGE_READING",
          "bat": 48,
          "ok": true,
          "fail": null
        },
        {
          "s": 6,
          "ts": "2026-09-05T18:19:12",
          "loc": "WP09",
          "asset": "PANEL-211",
          "type": "GAUGE_READING",
          "bat": 43,
          "ok": true,
          "fail": null
        },
        {
          "s": 7,
          "ts": "2026-09-05T18:22:24",
          "loc": "WP05",
          "asset": "HX-204",
          "type": "THERMAL_INSPECTION",
          "bat": 38,
          "ok": false,
          "fail": "TARGET_NOT_DETECTED"
        },
        {
          "s": 8,
          "ts": "2026-09-05T18:25:36",
          "loc": "WP12",
          "asset": "VALVE-207",
          "type": "THERMAL_INSPECTION",
          "bat": 33,
          "ok": true,
          "fail": null
        },
        {
          "s": 9,
          "ts": "2026-09-05T18:28:48",
          "loc": "WP07",
          "asset": "HX-202",
          "type": "ACOUSTIC_INSPECTION",
          "bat": 28,
          "ok": true,
          "fail": null
        },
        {
          "s": 10,
          "ts": "2026-09-05T18:32:00",
          "loc": "WP13",
          "asset": "HX-213",
          "type": "ACOUSTIC_INSPECTION",
          "bat": 23,
          "ok": true,
          "fail": null
        }
      ],
      "anoms": [
        {
          "s": 1,
          "sev": "LOW",
          "type": "SIGNAL_DEGRADATION",
          "asset": "HX-201",
          "loc": "WP05",
          "rev": false,
          "onOk": false
        }
      ],
      "flags": [
        {
          "s": 1,
          "asset": "HX-201",
          "type": "LOCALIZATION_CONFIDENCE_PCT",
          "val": 52.5,
          "unit": "pct",
          "norm": 88.3
        }
      ],
      "brief": "Mission M013 was marked completed. 8 of 10 actions succeeded. Failed: navigation at Pipe Gallery (HX-201); thermal inspection at Pipe Gallery (HX-204). 1 anomaly recorded, 0 needing review. 1 reading fell outside the normal range for its type. Battery went from 72% to 23%."
    },
    {
      "id": "M014",
      "v": "V1",
      "status": "COMPLETED",
      "start": "2026-09-06T02:00:00",
      "end": "2026-09-06T02:26:00",
      "dur": 26,
      "b0": 68,
      "b1": 22,
      "acts": [
        {
          "s": 1,
          "ts": "2026-09-06T02:02:36",
          "loc": "WP05",
          "asset": "HX-202",
          "type": "NAVIGATION",
          "bat": 63,
          "ok": true,
          "fail": null
        },
        {
          "s": 2,
          "ts": "2026-09-06T02:05:12",
          "loc": "WP09",
          "asset": "PANEL-212",
          "type": "GAUGE_READING",
          "bat": 59,
          "ok": false,
          "fail": "SENSOR_TIMEOUT"
        },
        {
          "s": 3,
          "ts": "2026-09-06T02:07:48",
          "loc": "WP06",
          "asset": "HX-217",
          "type": "GAUGE_READING",
          "bat": 54,
          "ok": false,
          "fail": "SENSOR_TIMEOUT"
        },
        {
          "s": 4,
          "ts": "2026-09-06T02:10:24",
          "loc": "WP06",
          "asset": "HX-217",
          "type": "NAVIGATION",
          "bat": 50,
          "ok": false,
          "fail": "LOCALIZATION_FAILURE"
        },
        {
          "s": 5,
          "ts": "2026-09-06T02:13:00",
          "loc": "WP13",
          "asset": "HX-213",
          "type": "ACOUSTIC_INSPECTION",
          "bat": 45,
          "ok": true,
          "fail": null
        },
        {
          "s": 6,
          "ts": "2026-09-06T02:15:36",
          "loc": "WP07",
          "asset": "HX-204",
          "type": "GAUGE_READING",
          "bat": 40,
          "ok": true,
          "fail": null
        },
        {
          "s": 7,
          "ts": "2026-09-06T02:18:12",
          "loc": "WP01",
          "asset": "PANEL-215",
          "type": "VISUAL_INSPECTION",
          "bat": 36,
          "ok": true,
          "fail": null
        },
        {
          "s": 8,
          "ts": "2026-09-06T02:20:48",
          "loc": "WP09",
          "asset": "PANEL-212",
          "type": "NAVIGATION",
          "bat": 31,
          "ok": true,
          "fail": null
        },
        {
          "s": 9,
          "ts": "2026-09-06T02:23:24",
          "loc": "WP15",
          "asset": "HX-202",
          "type": "VISUAL_INSPECTION",
          "bat": 27,
          "ok": true,
          "fail": null
        },
        {
          "s": 10,
          "ts": "2026-09-06T02:26:00",
          "loc": "WP02",
          "asset": "PANEL-215",
          "type": "ACOUSTIC_INSPECTION",
          "bat": 22,
          "ok": true,
          "fail": null
        }
      ],
      "anoms": [
        {
          "s": 3,
          "sev": "HIGH",
          "type": "GAUGE_OUT_OF_RANGE",
          "asset": "HX-217",
          "loc": "WP06",
          "rev": true,
          "onOk": false
        },
        {
          "s": 2,
          "sev": "HIGH",
          "type": "GAUGE_OUT_OF_RANGE",
          "asset": "PANEL-212",
          "loc": "WP09",
          "rev": true,
          "onOk": false
        }
      ],
      "flags": [
        {
          "s": 4,
          "asset": "HX-217",
          "type": "LOCALIZATION_CONFIDENCE_PCT",
          "val": 48.8,
          "unit": "pct",
          "norm": 88.3
        }
      ],
      "brief": "Mission M014 was marked completed. 7 of 10 actions succeeded. Failed: gauge reading at Turbine Hall South (PANEL-212); gauge reading at Compressor Area (HX-217); navigation at Compressor Area (HX-217). 2 anomalies recorded, 2 needing review. 1 reading fell outside the normal range for its type. Battery went from 68% to 22%."
    },
    {
      "id": "M015",
      "v": "V1",
      "status": "COMPLETED",
      "start": "2026-09-06T10:00:00",
      "end": "2026-09-06T10:34:00",
      "dur": 34,
      "b0": 77,
      "b1": 27,
      "acts": [
        {
          "s": 1,
          "ts": "2026-09-06T10:03:24",
          "loc": "WP05",
          "asset": "PANEL-203",
          "type": "NAVIGATION",
          "bat": 72,
          "ok": false,
          "fail": "LOCALIZATION_FAILURE"
        },
        {
          "s": 2,
          "ts": "2026-09-06T10:06:48",
          "loc": "WP11",
          "asset": "HX-210",
          "type": "VISUAL_INSPECTION",
          "bat": 67,
          "ok": true,
          "fail": null
        },
        {
          "s": 3,
          "ts": "2026-09-06T10:10:12",
          "loc": "WP05",
          "asset": "HX-202",
          "type": "VISUAL_INSPECTION",
          "bat": 62,
          "ok": true,
          "fail": null
        },
        {
          "s": 4,
          "ts": "2026-09-06T10:13:36",
          "loc": "WP08",
          "asset": "GAUGE-209",
          "type": "VISUAL_INSPECTION",
          "bat": 57,
          "ok": true,
          "fail": null
        },
        {
          "s": 5,
          "ts": "2026-09-06T10:17:00",
          "loc": "WP03",
          "asset": "HX-208",
          "type": "ACOUSTIC_INSPECTION",
          "bat": 52,
          "ok": true,
          "fail": null
        },
        {
          "s": 6,
          "ts": "2026-09-06T10:20:24",
          "loc": "WP04",
          "asset": "COMP-214",
          "type": "ACOUSTIC_INSPECTION",
          "bat": 47,
          "ok": false,
          "fail": "SENSOR_TIMEOUT"
        },
        {
          "s": 7,
          "ts": "2026-09-06T10:23:48",
          "loc": "WP07",
          "asset": "HX-213",
          "type": "ACOUSTIC_INSPECTION",
          "bat": 42,
          "ok": false,
          "fail": "SIGNAL_NOISE"
        },
        {
          "s": 8,
          "ts": "2026-09-06T10:27:12",
          "loc": "WP03",
          "asset": "HX-208",
          "type": "VISUAL_INSPECTION",
          "bat": 37,
          "ok": true,
          "fail": null
        },
        {
          "s": 9,
          "ts": "2026-09-06T10:30:36",
          "loc": "WP13",
          "asset": "HX-216",
          "type": "THERMAL_INSPECTION",
          "bat": 32,
          "ok": true,
          "fail": null
        },
        {
          "s": 10,
          "ts": "2026-09-06T10:34:00",
          "loc": "WP08",
          "asset": "PANEL-203",
          "type": "VISUAL_INSPECTION",
          "bat": 27,
          "ok": true,
          "fail": null
        }
      ],
      "anoms": [
        {
          "s": 7,
          "sev": "HIGH",
          "type": "ABNORMAL_VIBRATION",
          "asset": "HX-213",
          "loc": "WP07",
          "rev": true,
          "onOk": false
        },
        {
          "s": 2,
          "sev": "MEDIUM",
          "type": "VISUAL_DEFECT",
          "asset": "HX-210",
          "loc": "WP11",
          "rev": false,
          "onOk": true
        },
        {
          "s": 1,
          "sev": "LOW",
          "type": "SIGNAL_DEGRADATION",
          "asset": "PANEL-203",
          "loc": "WP05",
          "rev": false,
          "onOk": false
        },
        {
          "s": 6,
          "sev": "LOW",
          "type": "ABNORMAL_VIBRATION",
          "asset": "COMP-214",
          "loc": "WP04",
          "rev": false,
          "onOk": false
        }
      ],
      "flags": [
        {
          "s": 1,
          "asset": "PANEL-203",
          "type": "LOCALIZATION_CONFIDENCE_PCT",
          "val": 59.5,
          "unit": "pct",
          "norm": 88.3
        },
        {
          "s": 9,
          "asset": "HX-216",
          "type": "TEMPERATURE_C",
          "val": 39.8,
          "unit": "C",
          "norm": 63.8
        }
      ],
      "brief": "Mission M015 was marked completed. 7 of 10 actions succeeded. Failed: navigation at Pipe Gallery (PANEL-203); acoustic inspection at Pump Bay (COMP-214); acoustic inspection at Control Room Corridor (HX-213). 4 anomalies recorded, 1 needing review, 1 on an action that reported success. 2 readings fell outside the normal range for its type. Battery went from 77% to 27%."
    },
    {
      "id": "M016",
      "v": "V1",
      "status": "COMPLETED",
      "start": "2026-09-06T18:00:00",
      "end": "2026-09-06T18:26:00",
      "dur": 26,
      "b0": 76,
      "b1": 19,
      "acts": [
        {
          "s": 1,
          "ts": "2026-09-06T18:02:36",
          "loc": "WP05",
          "asset": "HX-204",
          "type": "NAVIGATION",
          "bat": 70,
          "ok": true,
          "fail": null
        },
        {
          "s": 2,
          "ts": "2026-09-06T18:05:12",
          "loc": "WP11",
          "asset": "HX-210",
          "type": "VISUAL_INSPECTION",
          "bat": 65,
          "ok": true,
          "fail": null
        },
        {
          "s": 3,
          "ts": "2026-09-06T18:07:48",
          "loc": "WP01",
          "asset": "PANEL-215",
          "type": "VISUAL_INSPECTION",
          "bat": 59,
          "ok": true,
          "fail": null
        },
        {
          "s": 4,
          "ts": "2026-09-06T18:10:24",
          "loc": "WP07",
          "asset": "HX-219",
          "type": "THERMAL_INSPECTION",
          "bat": 53,
          "ok": true,
          "fail": null
        },
        {
          "s": 5,
          "ts": "2026-09-06T18:13:00",
          "loc": "WP01",
          "asset": "PANEL-215",
          "type": "VISUAL_INSPECTION",
          "bat": 48,
          "ok": true,
          "fail": null
        },
        {
          "s": 6,
          "ts": "2026-09-06T18:15:36",
          "loc": "WP05",
          "asset": "HX-202",
          "type": "THERMAL_INSPECTION",
          "bat": 42,
          "ok": true,
          "fail": null
        },
        {
          "s": 7,
          "ts": "2026-09-06T18:18:12",
          "loc": "WP06",
          "asset": "HX-217",
          "type": "GAUGE_READING",
          "bat": 36,
          "ok": true,
          "fail": null
        },
        {
          "s": 8,
          "ts": "2026-09-06T18:20:48",
          "loc": "WP11",
          "asset": "HX-210",
          "type": "GAUGE_READING",
          "bat": 30,
          "ok": false,
          "fail": "READING_UNRELIABLE"
        },
        {
          "s": 9,
          "ts": "2026-09-06T18:23:24",
          "loc": "WP15",
          "asset": "HX-216",
          "type": "VISUAL_INSPECTION",
          "bat": 25,
          "ok": false,
          "fail": "TARGET_NOT_DETECTED"
        },
        {
          "s": 10,
          "ts": "2026-09-06T18:26:00",
          "loc": "WP09",
          "asset": "PANEL-212",
          "type": "VISUAL_INSPECTION",
          "bat": 19,
          "ok": false,
          "fail": "READING_UNRELIABLE"
        }
      ],
      "anoms": [
        {
          "s": 10,
          "sev": "HIGH",
          "type": "VISUAL_DEFECT",
          "asset": "PANEL-212",
          "loc": "WP09",
          "rev": true,
          "onOk": false
        }
      ],
      "flags": [],
      "brief": "Mission M016 was marked completed. 7 of 10 actions succeeded. Failed: gauge reading at Battery Room (HX-210); visual inspection at Inspection Dock (HX-216); visual inspection at Turbine Hall South (PANEL-212). 1 anomaly recorded, 1 needing review. Battery went from 76% to 19%."
    },
    {
      "id": "M017",
      "v": "V1",
      "status": "FAILED",
      "start": "2026-09-07T02:00:00",
      "end": "2026-09-07T02:31:00",
      "dur": 31,
      "b0": 77,
      "b1": 16,
      "acts": [
        {
          "s": 1,
          "ts": "2026-09-07T02:03:06",
          "loc": "WP05",
          "asset": "HX-201",
          "type": "NAVIGATION",
          "bat": 71,
          "ok": true,
          "fail": null
        },
        {
          "s": 2,
          "ts": "2026-09-07T02:06:12",
          "loc": "WP01",
          "asset": "PANEL-215",
          "type": "ACOUSTIC_INSPECTION",
          "bat": 65,
          "ok": true,
          "fail": null
        },
        {
          "s": 3,
          "ts": "2026-09-07T02:09:18",
          "loc": "WP08",
          "asset": "PANEL-203",
          "type": "NAVIGATION",
          "bat": 59,
          "ok": true,
          "fail": null
        },
        {
          "s": 4,
          "ts": "2026-09-07T02:12:24",
          "loc": "WP12",
          "asset": "PANEL-218",
          "type": "THERMAL_INSPECTION",
          "bat": 53,
          "ok": true,
          "fail": null
        },
        {
          "s": 5,
          "ts": "2026-09-07T02:15:30",
          "loc": "WP08",
          "asset": "HX-210",
          "type": "NAVIGATION",
          "bat": 46,
          "ok": true,
          "fail": null
        },
        {
          "s": 6,
          "ts": "2026-09-07T02:18:36",
          "loc": "WP09",
          "asset": "PANEL-211",
          "type": "VISUAL_INSPECTION",
          "bat": 40,
          "ok": false,
          "fail": "TARGET_NOT_DETECTED"
        },
        {
          "s": 7,
          "ts": "2026-09-07T02:21:42",
          "loc": "WP04",
          "asset": "COMP-214",
          "type": "VISUAL_INSPECTION",
          "bat": 34,
          "ok": true,
          "fail": null
        },
        {
          "s": 8,
          "ts": "2026-09-07T02:24:48",
          "loc": "WP03",
          "asset": "HX-208",
          "type": "GAUGE_READING",
          "bat": 28,
          "ok": false,
          "fail": "TARGET_NOT_DETECTED"
        },
        {
          "s": 9,
          "ts": "2026-09-07T02:27:54",
          "loc": "WP09",
          "asset": "PANEL-212",
          "type": "NAVIGATION",
          "bat": 22,
          "ok": false,
          "fail": "COMMUNICATION_LOSS"
        },
        {
          "s": 10,
          "ts": "2026-09-07T02:31:00",
          "loc": "WP12",
          "asset": "PANEL-218",
          "type": "THERMAL_INSPECTION",
          "bat": 16,
          "ok": true,
          "fail": null
        }
      ],
      "anoms": [
        {
          "s": 9,
          "sev": "CRITICAL",
          "type": "NAVIGATION_OBSTRUCTION",
          "asset": "PANEL-212",
          "loc": "WP09",
          "rev": true,
          "onOk": false
        },
        {
          "s": 8,
          "sev": "LOW",
          "type": "GAUGE_OUT_OF_RANGE",
          "asset": "HX-208",
          "loc": "WP03",
          "rev": false,
          "onOk": false
        }
      ],
      "flags": [
        {
          "s": 9,
          "asset": "PANEL-212",
          "type": "LOCALIZATION_CONFIDENCE_PCT",
          "val": 64.7,
          "unit": "pct",
          "norm": 88.3
        }
      ],
      "brief": "Mission M017 was marked failed. 7 of 10 actions succeeded. Failed: visual inspection at Turbine Hall South (PANEL-211); gauge reading at Cooling Loop (HX-208); navigation at Turbine Hall South (PANEL-212). 2 anomalies recorded, 1 needing review. 1 reading fell outside the normal range for its type. Battery went from 77% to 16%."
    },
    {
      "id": "M018",
      "v": "V1",
      "status": "COMPLETED",
      "start": "2026-09-07T10:00:00",
      "end": "2026-09-07T10:33:00",
      "dur": 33,
      "b0": 82,
      "b1": 28,
      "acts": [
        {
          "s": 1,
          "ts": "2026-09-07T10:03:18",
          "loc": "WP05",
          "asset": "HX-202",
          "type": "NAVIGATION",
          "bat": 77,
          "ok": true,
          "fail": null
        },
        {
          "s": 2,
          "ts": "2026-09-07T10:06:36",
          "loc": "WP04",
          "asset": "COMP-214",
          "type": "NAVIGATION",
          "bat": 71,
          "ok": true,
          "fail": null
        },
        {
          "s": 3,
          "ts": "2026-09-07T10:09:54",
          "loc": "WP08",
          "asset": "HX-213",
          "type": "ACOUSTIC_INSPECTION",
          "bat": 66,
          "ok": true,
          "fail": null
        },
        {
          "s": 4,
          "ts": "2026-09-07T10:13:12",
          "loc": "WP05",
          "asset": "HX-201",
          "type": "GAUGE_READING",
          "bat": 60,
          "ok": true,
          "fail": null
        },
        {
          "s": 5,
          "ts": "2026-09-07T10:16:30",
          "loc": "WP05",
          "asset": "HX-204",
          "type": "VISUAL_INSPECTION",
          "bat": 55,
          "ok": true,
          "fail": null
        },
        {
          "s": 6,
          "ts": "2026-09-07T10:19:48",
          "loc": "WP15",
          "asset": "HX-217",
          "type": "THERMAL_INSPECTION",
          "bat": 50,
          "ok": true,
          "fail": null
        },
        {
          "s": 7,
          "ts": "2026-09-07T10:23:06",
          "loc": "WP09",
          "asset": "PANEL-212",
          "type": "GAUGE_READING",
          "bat": 44,
          "ok": true,
          "fail": null
        },
        {
          "s": 8,
          "ts": "2026-09-07T10:26:24",
          "loc": "WP09",
          "asset": "PANEL-211",
          "type": "VISUAL_INSPECTION",
          "bat": 39,
          "ok": true,
          "fail": null
        },
        {
          "s": 9,
          "ts": "2026-09-07T10:29:42",
          "loc": "WP10",
          "asset": "PUMP-205",
          "type": "NAVIGATION",
          "bat": 33,
          "ok": true,
          "fail": null
        },
        {
          "s": 10,
          "ts": "2026-09-07T10:33:00",
          "loc": "WP14",
          "asset": "PUMP-220",
          "type": "NAVIGATION",
          "bat": 28,
          "ok": true,
          "fail": null
        }
      ],
      "anoms": [],
      "flags": [],
      "brief": "Mission M018 was marked completed. All 10 actions succeeded. Battery went from 82% to 28%."
    },
    {
      "id": "M019",
      "v": "V2",
      "status": "COMPLETED",
      "start": "2026-09-07T18:00:00",
      "end": "2026-09-07T18:22:00",
      "dur": 22,
      "b0": 84,
      "b1": 65,
      "acts": [
        {
          "s": 1,
          "ts": "2026-09-07T18:02:12",
          "loc": "WP05",
          "asset": "PANEL-203",
          "type": "NAVIGATION",
          "bat": 82,
          "ok": true,
          "fail": null
        },
        {
          "s": 2,
          "ts": "2026-09-07T18:04:24",
          "loc": "WP07",
          "asset": "HX-217",
          "type": "VISUAL_INSPECTION",
          "bat": 80,
          "ok": true,
          "fail": null
        },
        {
          "s": 3,
          "ts": "2026-09-07T18:06:36",
          "loc": "WP02",
          "asset": "HX-204",
          "type": "VISUAL_INSPECTION",
          "bat": 78,
          "ok": true,
          "fail": null
        },
        {
          "s": 4,
          "ts": "2026-09-07T18:08:48",
          "loc": "WP06",
          "asset": "HX-217",
          "type": "THERMAL_INSPECTION",
          "bat": 76,
          "ok": true,
          "fail": null
        },
        {
          "s": 5,
          "ts": "2026-09-07T18:11:00",
          "loc": "WP02",
          "asset": "PANEL-203",
          "type": "GAUGE_READING",
          "bat": 74,
          "ok": true,
          "fail": null
        },
        {
          "s": 6,
          "ts": "2026-09-07T18:13:12",
          "loc": "WP11",
          "asset": "HX-210",
          "type": "VISUAL_INSPECTION",
          "bat": 73,
          "ok": true,
          "fail": null
        },
        {
          "s": 7,
          "ts": "2026-09-07T18:15:24",
          "loc": "WP14",
          "asset": "PUMP-220",
          "type": "NAVIGATION",
          "bat": 71,
          "ok": true,
          "fail": null
        },
        {
          "s": 8,
          "ts": "2026-09-07T18:17:36",
          "loc": "WP02",
          "asset": "PANEL-203",
          "type": "THERMAL_INSPECTION",
          "bat": 69,
          "ok": true,
          "fail": null
        },
        {
          "s": 9,
          "ts": "2026-09-07T18:19:48",
          "loc": "WP14",
          "asset": "MOTOR-206",
          "type": "NAVIGATION",
          "bat": 67,
          "ok": true,
          "fail": null
        },
        {
          "s": 10,
          "ts": "2026-09-07T18:22:00",
          "loc": "WP13",
          "asset": "HX-213",
          "type": "VISUAL_INSPECTION",
          "bat": 65,
          "ok": true,
          "fail": null
        }
      ],
      "anoms": [],
      "flags": [],
      "brief": "Mission M019 was marked completed. All 10 actions succeeded. Battery went from 84% to 65%."
    },
    {
      "id": "M020",
      "v": "V2",
      "status": "COMPLETED",
      "start": "2026-09-08T02:00:00",
      "end": "2026-09-08T02:20:00",
      "dur": 20,
      "b0": 86,
      "b1": 70,
      "acts": [
        {
          "s": 1,
          "ts": "2026-09-08T02:02:00",
          "loc": "WP05",
          "asset": "HX-204",
          "type": "NAVIGATION",
          "bat": 84,
          "ok": false,
          "fail": "LOCALIZATION_FAILURE"
        },
        {
          "s": 2,
          "ts": "2026-09-08T02:04:00",
          "loc": "WP06",
          "asset": "HX-217",
          "type": "NAVIGATION",
          "bat": 83,
          "ok": true,
          "fail": null
        },
        {
          "s": 3,
          "ts": "2026-09-08T02:06:00",
          "loc": "WP11",
          "asset": "HX-210",
          "type": "THERMAL_INSPECTION",
          "bat": 81,
          "ok": true,
          "fail": null
        },
        {
          "s": 4,
          "ts": "2026-09-08T02:08:00",
          "loc": "WP07",
          "asset": "HX-204",
          "type": "THERMAL_INSPECTION",
          "bat": 80,
          "ok": true,
          "fail": null
        },
        {
          "s": 5,
          "ts": "2026-09-08T02:10:00",
          "loc": "WP10",
          "asset": "PUMP-205",
          "type": "THERMAL_INSPECTION",
          "bat": 78,
          "ok": true,
          "fail": null
        },
        {
          "s": 6,
          "ts": "2026-09-08T02:12:00",
          "loc": "WP12",
          "asset": "VALVE-207",
          "type": "THERMAL_INSPECTION",
          "bat": 76,
          "ok": true,
          "fail": null
        },
        {
          "s": 7,
          "ts": "2026-09-08T02:14:00",
          "loc": "WP15",
          "asset": "PANEL-203",
          "type": "ACOUSTIC_INSPECTION",
          "bat": 75,
          "ok": true,
          "fail": null
        },
        {
          "s": 8,
          "ts": "2026-09-08T02:16:00",
          "loc": "WP07",
          "asset": "PUMP-220",
          "type": "NAVIGATION",
          "bat": 73,
          "ok": true,
          "fail": null
        },
        {
          "s": 9,
          "ts": "2026-09-08T02:18:00",
          "loc": "WP09",
          "asset": "PANEL-211",
          "type": "ACOUSTIC_INSPECTION",
          "bat": 72,
          "ok": true,
          "fail": null
        },
        {
          "s": 10,
          "ts": "2026-09-08T02:20:00",
          "loc": "WP10",
          "asset": "PUMP-205",
          "type": "ACOUSTIC_INSPECTION",
          "bat": 70,
          "ok": true,
          "fail": null
        }
      ],
      "anoms": [
        {
          "s": 4,
          "sev": "CRITICAL",
          "type": "ABNORMAL_TEMPERATURE",
          "asset": "HX-204",
          "loc": "WP07",
          "rev": true,
          "onOk": true
        },
        {
          "s": 10,
          "sev": "MEDIUM",
          "type": "ABNORMAL_VIBRATION",
          "asset": "PUMP-205",
          "loc": "WP10",
          "rev": false,
          "onOk": true
        },
        {
          "s": 1,
          "sev": "MEDIUM",
          "type": "NAVIGATION_OBSTRUCTION",
          "asset": "HX-204",
          "loc": "WP05",
          "rev": false,
          "onOk": false
        }
      ],
      "flags": [
        {
          "s": 1,
          "asset": "HX-204",
          "type": "LOCALIZATION_CONFIDENCE_PCT",
          "val": 53.7,
          "unit": "pct",
          "norm": 88.3
        },
        {
          "s": 4,
          "asset": "HX-204",
          "type": "TEMPERATURE_C",
          "val": 41.4,
          "unit": "C",
          "norm": 63.8
        }
      ],
      "brief": "Mission M020 was marked completed. 9 of 10 actions succeeded. Failed: navigation at Pipe Gallery (HX-204). 3 anomalies recorded, 1 needing review, 2 on an action that reported success. 2 readings fell outside the normal range for its type. Battery went from 86% to 70%."
    },
    {
      "id": "M021",
      "v": "V2",
      "status": "COMPLETED",
      "start": "2026-09-08T10:00:00",
      "end": "2026-09-08T10:22:00",
      "dur": 22,
      "b0": 98,
      "b1": 65,
      "acts": [
        {
          "s": 1,
          "ts": "2026-09-08T10:02:12",
          "loc": "WP05",
          "asset": "HX-201",
          "type": "NAVIGATION",
          "bat": 95,
          "ok": true,
          "fail": null
        },
        {
          "s": 2,
          "ts": "2026-09-08T10:04:24",
          "loc": "WP05",
          "asset": "PANEL-203",
          "type": "VISUAL_INSPECTION",
          "bat": 91,
          "ok": true,
          "fail": null
        },
        {
          "s": 3,
          "ts": "2026-09-08T10:06:36",
          "loc": "WP15",
          "asset": "VALVE-207",
          "type": "ACOUSTIC_INSPECTION",
          "bat": 88,
          "ok": false,
          "fail": "READING_UNRELIABLE"
        },
        {
          "s": 4,
          "ts": "2026-09-08T10:08:48",
          "loc": "WP12",
          "asset": "VALVE-207",
          "type": "GAUGE_READING",
          "bat": 85,
          "ok": true,
          "fail": null
        },
        {
          "s": 5,
          "ts": "2026-09-08T10:11:00",
          "loc": "WP10",
          "asset": "PUMP-205",
          "type": "ACOUSTIC_INSPECTION",
          "bat": 82,
          "ok": true,
          "fail": null
        },
        {
          "s": 6,
          "ts": "2026-09-08T10:13:12",
          "loc": "WP14",
          "asset": "GAUGE-209",
          "type": "GAUGE_READING",
          "bat": 78,
          "ok": true,
          "fail": null
        },
        {
          "s": 7,
          "ts": "2026-09-08T10:15:24",
          "loc": "WP10",
          "asset": "PUMP-205",
          "type": "THERMAL_INSPECTION",
          "bat": 75,
          "ok": true,
          "fail": null
        },
        {
          "s": 8,
          "ts": "2026-09-08T10:17:36",
          "loc": "WP12",
          "asset": "PANEL-218",
          "type": "GAUGE_READING",
          "bat": 72,
          "ok": true,
          "fail": null
        },
        {
          "s": 9,
          "ts": "2026-09-08T10:19:48",
          "loc": "WP06",
          "asset": "HX-217",
          "type": "ACOUSTIC_INSPECTION",
          "bat": 68,
          "ok": true,
          "fail": null
        },
        {
          "s": 10,
          "ts": "2026-09-08T10:22:00",
          "loc": "WP09",
          "asset": "PANEL-211",
          "type": "VISUAL_INSPECTION",
          "bat": 65,
          "ok": true,
          "fail": null
        }
      ],
      "anoms": [],
      "flags": [
        {
          "s": 3,
          "asset": "VALVE-207",
          "type": "SOUND_DB",
          "val": 52.9,
          "unit": "dB",
          "norm": 72.0
        }
      ],
      "brief": "Mission M021 was marked completed. 9 of 10 actions succeeded. Failed: acoustic inspection at Inspection Dock (VALVE-207). 1 reading fell outside the normal range for its type. Battery went from 98% to 65%."
    },
    {
      "id": "M022",
      "v": "V2",
      "status": "COMPLETED",
      "start": "2026-09-08T18:00:00",
      "end": "2026-09-08T18:24:00",
      "dur": 24,
      "b0": 86,
      "b1": 68,
      "acts": [
        {
          "s": 1,
          "ts": "2026-09-08T18:02:24",
          "loc": "WP05",
          "asset": "HX-202",
          "type": "NAVIGATION",
          "bat": 84,
          "ok": true,
          "fail": null
        },
        {
          "s": 2,
          "ts": "2026-09-08T18:04:48",
          "loc": "WP04",
          "asset": "COMP-214",
          "type": "VISUAL_INSPECTION",
          "bat": 82,
          "ok": true,
          "fail": null
        },
        {
          "s": 3,
          "ts": "2026-09-08T18:07:12",
          "loc": "WP12",
          "asset": "PANEL-218",
          "type": "NAVIGATION",
          "bat": 81,
          "ok": false,
          "fail": "COMMUNICATION_LOSS"
        },
        {
          "s": 4,
          "ts": "2026-09-08T18:09:36",
          "loc": "WP11",
          "asset": "HX-210",
          "type": "THERMAL_INSPECTION",
          "bat": 79,
          "ok": true,
          "fail": null
        },
        {
          "s": 5,
          "ts": "2026-09-08T18:12:00",
          "loc": "WP04",
          "asset": "COMP-214",
          "type": "GAUGE_READING",
          "bat": 77,
          "ok": true,
          "fail": null
        },
        {
          "s": 6,
          "ts": "2026-09-08T18:14:24",
          "loc": "WP13",
          "asset": "HX-213",
          "type": "NAVIGATION",
          "bat": 75,
          "ok": true,
          "fail": null
        },
        {
          "s": 7,
          "ts": "2026-09-08T18:16:48",
          "loc": "WP01",
          "asset": "PANEL-215",
          "type": "ACOUSTIC_INSPECTION",
          "bat": 73,
          "ok": true,
          "fail": null
        },
        {
          "s": 8,
          "ts": "2026-09-08T18:19:12",
          "loc": "WP13",
          "asset": "HX-216",
          "type": "THERMAL_INSPECTION",
          "bat": 72,
          "ok": true,
          "fail": null
        },
        {
          "s": 9,
          "ts": "2026-09-08T18:21:36",
          "loc": "WP04",
          "asset": "COMP-214",
          "type": "THERMAL_INSPECTION",
          "bat": 70,
          "ok": true,
          "fail": null
        },
        {
          "s": 10,
          "ts": "2026-09-08T18:24:00",
          "loc": "WP15",
          "asset": "PANEL-218",
          "type": "VISUAL_INSPECTION",
          "bat": 68,
          "ok": true,
          "fail": null
        }
      ],
      "anoms": [
        {
          "s": 3,
          "sev": "HIGH",
          "type": "SIGNAL_DEGRADATION",
          "asset": "PANEL-218",
          "loc": "WP12",
          "rev": true,
          "onOk": false
        }
      ],
      "flags": [],
      "brief": "Mission M022 was marked completed. 9 of 10 actions succeeded. Failed: navigation at Heat Exchanger Area (PANEL-218). 1 anomaly recorded, 1 needing review. Battery went from 86% to 68%."
    },
    {
      "id": "M023",
      "v": "V2",
      "status": "COMPLETED",
      "start": "2026-09-09T02:00:00",
      "end": "2026-09-09T02:21:00",
      "dur": 21,
      "b0": 94,
      "b1": 52,
      "acts": [
        {
          "s": 1,
          "ts": "2026-09-09T02:02:06",
          "loc": "WP05",
          "asset": "PANEL-203",
          "type": "NAVIGATION",
          "bat": 90,
          "ok": true,
          "fail": null
        },
        {
          "s": 2,
          "ts": "2026-09-09T02:04:12",
          "loc": "WP08",
          "asset": "PUMP-205",
          "type": "GAUGE_READING",
          "bat": 86,
          "ok": true,
          "fail": null
        },
        {
          "s": 3,
          "ts": "2026-09-09T02:06:18",
          "loc": "WP13",
          "asset": "HX-213",
          "type": "THERMAL_INSPECTION",
          "bat": 81,
          "ok": true,
          "fail": null
        },
        {
          "s": 4,
          "ts": "2026-09-09T02:08:24",
          "loc": "WP09",
          "asset": "PANEL-211",
          "type": "VISUAL_INSPECTION",
          "bat": 77,
          "ok": true,
          "fail": null
        },
        {
          "s": 5,
          "ts": "2026-09-09T02:10:30",
          "loc": "WP01",
          "asset": "PANEL-215",
          "type": "VISUAL_INSPECTION",
          "bat": 73,
          "ok": true,
          "fail": null
        },
        {
          "s": 6,
          "ts": "2026-09-09T02:12:36",
          "loc": "WP07",
          "asset": "PANEL-203",
          "type": "NAVIGATION",
          "bat": 69,
          "ok": true,
          "fail": null
        },
        {
          "s": 7,
          "ts": "2026-09-09T02:14:42",
          "loc": "WP11",
          "asset": "HX-210",
          "type": "THERMAL_INSPECTION",
          "bat": 65,
          "ok": true,
          "fail": null
        },
        {
          "s": 8,
          "ts": "2026-09-09T02:16:48",
          "loc": "WP05",
          "asset": "HX-201",
          "type": "THERMAL_INSPECTION",
          "bat": 60,
          "ok": true,
          "fail": null
        },
        {
          "s": 9,
          "ts": "2026-09-09T02:18:54",
          "loc": "WP02",
          "asset": "HX-208",
          "type": "ACOUSTIC_INSPECTION",
          "bat": 56,
          "ok": true,
          "fail": null
        },
        {
          "s": 10,
          "ts": "2026-09-09T02:21:00",
          "loc": "WP03",
          "asset": "HX-208",
          "type": "VISUAL_INSPECTION",
          "bat": 52,
          "ok": true,
          "fail": null
        }
      ],
      "anoms": [],
      "flags": [],
      "brief": "Mission M023 was marked completed. All 10 actions succeeded. Battery went from 94% to 52%."
    },
    {
      "id": "M024",
      "v": "V2",
      "status": "COMPLETED",
      "start": "2026-09-09T10:00:00",
      "end": "2026-09-09T10:19:00",
      "dur": 19,
      "b0": 94,
      "b1": 54,
      "acts": [
        {
          "s": 1,
          "ts": "2026-09-09T10:01:54",
          "loc": "WP05",
          "asset": "HX-204",
          "type": "NAVIGATION",
          "bat": 90,
          "ok": true,
          "fail": null
        },
        {
          "s": 2,
          "ts": "2026-09-09T10:03:48",
          "loc": "WP04",
          "asset": "COMP-214",
          "type": "NAVIGATION",
          "bat": 86,
          "ok": true,
          "fail": null
        },
        {
          "s": 3,
          "ts": "2026-09-09T10:05:42",
          "loc": "WP10",
          "asset": "PUMP-205",
          "type": "ACOUSTIC_INSPECTION",
          "bat": 82,
          "ok": false,
          "fail": "SENSOR_TIMEOUT"
        },
        {
          "s": 4,
          "ts": "2026-09-09T10:07:36",
          "loc": "WP01",
          "asset": "PANEL-215",
          "type": "NAVIGATION",
          "bat": 78,
          "ok": false,
          "fail": "OBSTACLE_DETECTION"
        },
        {
          "s": 5,
          "ts": "2026-09-09T10:09:30",
          "loc": "WP08",
          "asset": "HX-202",
          "type": "NAVIGATION",
          "bat": 74,
          "ok": true,
          "fail": null
        },
        {
          "s": 6,
          "ts": "2026-09-09T10:11:24",
          "loc": "WP07",
          "asset": "HX-204",
          "type": "VISUAL_INSPECTION",
          "bat": 70,
          "ok": true,
          "fail": null
        },
        {
          "s": 7,
          "ts": "2026-09-09T10:13:18",
          "loc": "WP02",
          "asset": "HX-216",
          "type": "THERMAL_INSPECTION",
          "bat": 66,
          "ok": true,
          "fail": null
        },
        {
          "s": 8,
          "ts": "2026-09-09T10:15:12",
          "loc": "WP15",
          "asset": "PANEL-203",
          "type": "THERMAL_INSPECTION",
          "bat": 62,
          "ok": true,
          "fail": null
        },
        {
          "s": 9,
          "ts": "2026-09-09T10:17:06",
          "loc": "WP11",
          "asset": "HX-210",
          "type": "NAVIGATION",
          "bat": 58,
          "ok": true,
          "fail": null
        },
        {
          "s": 10,
          "ts": "2026-09-09T10:19:00",
          "loc": "WP04",
          "asset": "COMP-214",
          "type": "ACOUSTIC_INSPECTION",
          "bat": 54,
          "ok": true,
          "fail": null
        }
      ],
      "anoms": [
        {
          "s": 3,
          "sev": "HIGH",
          "type": "ABNORMAL_VIBRATION",
          "asset": "PUMP-205",
          "loc": "WP10",
          "rev": true,
          "onOk": false
        },
        {
          "s": 4,
          "sev": "MEDIUM",
          "type": "LOCALIZATION_ISSUE",
          "asset": "PANEL-215",
          "loc": "WP01",
          "rev": false,
          "onOk": false
        }
      ],
      "flags": [
        {
          "s": 4,
          "asset": "PANEL-215",
          "type": "LOCALIZATION_CONFIDENCE_PCT",
          "val": 49.2,
          "unit": "pct",
          "norm": 88.3
        }
      ],
      "brief": "Mission M024 was marked completed. 8 of 10 actions succeeded. Failed: acoustic inspection at Valve Station (PUMP-205); navigation at Main Entrance (PANEL-215). 2 anomalies recorded, 1 needing review. 1 reading fell outside the normal range for its type. Battery went from 94% to 54%."
    },
    {
      "id": "M025",
      "v": "V2",
      "status": "COMPLETED",
      "start": "2026-09-09T18:00:00",
      "end": "2026-09-09T18:18:00",
      "dur": 18,
      "b0": 93,
      "b1": 72,
      "acts": [
        {
          "s": 1,
          "ts": "2026-09-09T18:01:48",
          "loc": "WP05",
          "asset": "HX-201",
          "type": "NAVIGATION",
          "bat": 91,
          "ok": true,
          "fail": null
        },
        {
          "s": 2,
          "ts": "2026-09-09T18:03:36",
          "loc": "WP12",
          "asset": "VALVE-207",
          "type": "VISUAL_INSPECTION",
          "bat": 89,
          "ok": true,
          "fail": null
        },
        {
          "s": 3,
          "ts": "2026-09-09T18:05:24",
          "loc": "WP12",
          "asset": "PANEL-218",
          "type": "NAVIGATION",
          "bat": 87,
          "ok": true,
          "fail": null
        },
        {
          "s": 4,
          "ts": "2026-09-09T18:07:12",
          "loc": "WP01",
          "asset": "PANEL-215",
          "type": "NAVIGATION",
          "bat": 85,
          "ok": true,
          "fail": null
        },
        {
          "s": 5,
          "ts": "2026-09-09T18:09:00",
          "loc": "WP09",
          "asset": "PANEL-212",
          "type": "GAUGE_READING",
          "bat": 82,
          "ok": true,
          "fail": null
        },
        {
          "s": 6,
          "ts": "2026-09-09T18:10:48",
          "loc": "WP11",
          "asset": "HX-210",
          "type": "THERMAL_INSPECTION",
          "bat": 80,
          "ok": true,
          "fail": null
        },
        {
          "s": 7,
          "ts": "2026-09-09T18:12:36",
          "loc": "WP11",
          "asset": "HX-210",
          "type": "ACOUSTIC_INSPECTION",
          "bat": 78,
          "ok": false,
          "fail": "SIGNAL_NOISE"
        },
        {
          "s": 8,
          "ts": "2026-09-09T18:14:24",
          "loc": "WP02",
          "asset": "PANEL-212",
          "type": "NAVIGATION",
          "bat": 76,
          "ok": true,
          "fail": null
        },
        {
          "s": 9,
          "ts": "2026-09-09T18:16:12",
          "loc": "WP07",
          "asset": "HX-208",
          "type": "GAUGE_READING",
          "bat": 74,
          "ok": false,
          "fail": "SENSOR_TIMEOUT"
        },
        {
          "s": 10,
          "ts": "2026-09-09T18:18:00",
          "loc": "WP08",
          "asset": "HX-201",
          "type": "VISUAL_INSPECTION",
          "bat": 72,
          "ok": true,
          "fail": null
        }
      ],
      "anoms": [
        {
          "s": 7,
          "sev": "HIGH",
          "type": "ABNORMAL_VIBRATION",
          "asset": "HX-210",
          "loc": "WP11",
          "rev": true,
          "onOk": false
        },
        {
          "s": 8,
          "sev": "LOW",
          "type": "SIGNAL_DEGRADATION",
          "asset": "PANEL-212",
          "loc": "WP02",
          "rev": false,
          "onOk": true
        },
        {
          "s": 9,
          "sev": "LOW",
          "type": "GAUGE_OUT_OF_RANGE",
          "asset": "HX-208",
          "loc": "WP07",
          "rev": false,
          "onOk": false
        }
      ],
      "flags": [],
      "brief": "Mission M025 was marked completed. 8 of 10 actions succeeded. Failed: acoustic inspection at Battery Room (HX-210); gauge reading at Control Room Corridor (HX-208). 3 anomalies recorded, 1 needing review, 1 on an action that reported success. Battery went from 93% to 72%."
    },
    {
      "id": "M026",
      "v": "V2",
      "status": "COMPLETED",
      "start": "2026-09-10T02:00:00",
      "end": "2026-09-10T02:23:00",
      "dur": 23,
      "b0": 82,
      "b1": 52,
      "acts": [
        {
          "s": 1,
          "ts": "2026-09-10T02:02:18",
          "loc": "WP08",
          "asset": "PANEL-212",
          "type": "VISUAL_INSPECTION",
          "bat": 79,
          "ok": true,
          "fail": null
        },
        {
          "s": 2,
          "ts": "2026-09-10T02:04:36",
          "loc": "WP03",
          "asset": "HX-208",
          "type": "GAUGE_READING",
          "bat": 76,
          "ok": true,
          "fail": null
        },
        {
          "s": 3,
          "ts": "2026-09-10T02:06:54",
          "loc": "WP13",
          "asset": "HX-216",
          "type": "THERMAL_INSPECTION",
          "bat": 73,
          "ok": true,
          "fail": null
        },
        {
          "s": 4,
          "ts": "2026-09-10T02:09:12",
          "loc": "WP07",
          "asset": "VALVE-207",
          "type": "VISUAL_INSPECTION",
          "bat": 70,
          "ok": true,
          "fail": null
        },
        {
          "s": 5,
          "ts": "2026-09-10T02:11:30",
          "loc": "WP14",
          "asset": "MOTOR-206",
          "type": "ACOUSTIC_INSPECTION",
          "bat": 67,
          "ok": true,
          "fail": null
        },
        {
          "s": 6,
          "ts": "2026-09-10T02:13:48",
          "loc": "WP13",
          "asset": "HX-219",
          "type": "NAVIGATION",
          "bat": 64,
          "ok": true,
          "fail": null
        },
        {
          "s": 7,
          "ts": "2026-09-10T02:16:06",
          "loc": "WP12",
          "asset": "VALVE-207",
          "type": "GAUGE_READING",
          "bat": 61,
          "ok": true,
          "fail": null
        },
        {
          "s": 8,
          "ts": "2026-09-10T02:18:24",
          "loc": "WP09",
          "asset": "PANEL-211",
          "type": "NAVIGATION",
          "bat": 58,
          "ok": true,
          "fail": null
        },
        {
          "s": 9,
          "ts": "2026-09-10T02:20:42",
          "loc": "WP02",
          "asset": "PANEL-215",
          "type": "VISUAL_INSPECTION",
          "bat": 55,
          "ok": true,
          "fail": null
        },
        {
          "s": 10,
          "ts": "2026-09-10T02:23:00",
          "loc": "WP15",
          "asset": "HX-210",
          "type": "ACOUSTIC_INSPECTION",
          "bat": 52,
          "ok": true,
          "fail": null
        }
      ],
      "anoms": [
        {
          "s": 1,
          "sev": "MEDIUM",
          "type": "VISUAL_DEFECT",
          "asset": "PANEL-212",
          "loc": "WP08",
          "rev": false,
          "onOk": true
        }
      ],
      "flags": [],
      "brief": "Mission M026 was marked completed. All 10 actions succeeded. 1 anomaly recorded, 0 needing review, 1 on an action that reported success. Battery went from 82% to 52%."
    },
    {
      "id": "M027",
      "v": "V2",
      "status": "COMPLETED",
      "start": "2026-09-10T10:00:00",
      "end": "2026-09-10T10:25:00",
      "dur": 25,
      "b0": 92,
      "b1": 61,
      "acts": [
        {
          "s": 1,
          "ts": "2026-09-10T10:02:30",
          "loc": "WP01",
          "asset": "PANEL-215",
          "type": "NAVIGATION",
          "bat": 89,
          "ok": true,
          "fail": null
        },
        {
          "s": 2,
          "ts": "2026-09-10T10:05:00",
          "loc": "WP12",
          "asset": "VALVE-207",
          "type": "ACOUSTIC_INSPECTION",
          "bat": 86,
          "ok": true,
          "fail": null
        },
        {
          "s": 3,
          "ts": "2026-09-10T10:07:30",
          "loc": "WP06",
          "asset": "HX-217",
          "type": "GAUGE_READING",
          "bat": 83,
          "ok": true,
          "fail": null
        },
        {
          "s": 4,
          "ts": "2026-09-10T10:10:00",
          "loc": "WP07",
          "asset": "PANEL-211",
          "type": "THERMAL_INSPECTION",
          "bat": 80,
          "ok": true,
          "fail": null
        },
        {
          "s": 5,
          "ts": "2026-09-10T10:12:30",
          "loc": "WP02",
          "asset": "HX-202",
          "type": "ACOUSTIC_INSPECTION",
          "bat": 76,
          "ok": false,
          "fail": "READING_UNRELIABLE"
        },
        {
          "s": 6,
          "ts": "2026-09-10T10:15:00",
          "loc": "WP13",
          "asset": "HX-219",
          "type": "NAVIGATION",
          "bat": 73,
          "ok": true,
          "fail": null
        },
        {
          "s": 7,
          "ts": "2026-09-10T10:17:30",
          "loc": "WP11",
          "asset": "HX-210",
          "type": "VISUAL_INSPECTION",
          "bat": 70,
          "ok": true,
          "fail": null
        },
        {
          "s": 8,
          "ts": "2026-09-10T10:20:00",
          "loc": "WP10",
          "asset": "PUMP-205",
          "type": "GAUGE_READING",
          "bat": 67,
          "ok": true,
          "fail": null
        },
        {
          "s": 9,
          "ts": "2026-09-10T10:22:30",
          "loc": "WP13",
          "asset": "HX-219",
          "type": "NAVIGATION",
          "bat": 64,
          "ok": true,
          "fail": null
        },
        {
          "s": 10,
          "ts": "2026-09-10T10:25:00",
          "loc": "WP03",
          "asset": "HX-208",
          "type": "GAUGE_READING",
          "bat": 61,
          "ok": true,
          "fail": null
        }
      ],
      "anoms": [
        {
          "s": 5,
          "sev": "HIGH",
          "type": "ABNORMAL_VIBRATION",
          "asset": "HX-202",
          "loc": "WP02",
          "rev": true,
          "onOk": false
        },
        {
          "s": 6,
          "sev": "MEDIUM",
          "type": "SIGNAL_DEGRADATION",
          "asset": "HX-219",
          "loc": "WP13",
          "rev": false,
          "onOk": true
        }
      ],
      "flags": [],
      "brief": "Mission M027 was marked completed. 9 of 10 actions succeeded. Failed: acoustic inspection at Electrical Room (HX-202). 2 anomalies recorded, 1 needing review, 1 on an action that reported success. Battery went from 92% to 61%."
    }
  ],
  "locations": [
    {
      "id": "WP01",
      "name": "Main Entrance",
      "x": 15.7,
      "y": 50.2,
      "env": "NORMAL",
      "zone": "ACCESS"
    },
    {
      "id": "WP02",
      "name": "Electrical Room",
      "x": 63.2,
      "y": 90.8,
      "env": "INDOOR_DUSTY",
      "zone": "ELECTRICAL"
    },
    {
      "id": "WP03",
      "name": "Cooling Loop",
      "x": 85.5,
      "y": 60.9,
      "env": "LOW_LIGHT",
      "zone": "PROCESS"
    },
    {
      "id": "WP04",
      "name": "Pump Bay",
      "x": 75.5,
      "y": 54.3,
      "env": "LOW_LIGHT",
      "zone": "MECHANICAL"
    },
    {
      "id": "WP05",
      "name": "Pipe Gallery",
      "x": 72.6,
      "y": 57.8,
      "env": "HIGH_NOISE",
      "zone": "PROCESS"
    },
    {
      "id": "WP06",
      "name": "Compressor Area",
      "x": 5.2,
      "y": 12.3,
      "env": "HIGH_NOISE",
      "zone": "MECHANICAL"
    },
    {
      "id": "WP07",
      "name": "Control Room Corridor",
      "x": 78.5,
      "y": 45.5,
      "env": "LOW_LIGHT",
      "zone": "ACCESS"
    },
    {
      "id": "WP08",
      "name": "Turbine Hall North",
      "x": 66.1,
      "y": 23.9,
      "env": "HIGH_NOISE",
      "zone": "MECHANICAL"
    },
    {
      "id": "WP09",
      "name": "Turbine Hall South",
      "x": 36.3,
      "y": 94.9,
      "env": "HIGH_NOISE",
      "zone": "MECHANICAL"
    },
    {
      "id": "WP10",
      "name": "Valve Station",
      "x": 77.5,
      "y": 95.0,
      "env": "NORMAL",
      "zone": "PROCESS"
    },
    {
      "id": "WP11",
      "name": "Battery Room",
      "x": 62.4,
      "y": 70.1,
      "env": "INDOOR_DRY",
      "zone": "ELECTRICAL"
    },
    {
      "id": "WP12",
      "name": "Heat Exchanger Area",
      "x": 55.2,
      "y": 31.3,
      "env": "LOW_LIGHT",
      "zone": "PROCESS"
    },
    {
      "id": "WP13",
      "name": "Warehouse Corridor",
      "x": 17.7,
      "y": 63.0,
      "env": "NORMAL",
      "zone": "ACCESS"
    },
    {
      "id": "WP14",
      "name": "Auxiliary Systems Bay",
      "x": 32.8,
      "y": 81.3,
      "env": "HIGH_NOISE",
      "zone": "MECHANICAL"
    },
    {
      "id": "WP15",
      "name": "Inspection Dock",
      "x": 37.7,
      "y": 43.0,
      "env": "LOW_LIGHT",
      "zone": "ACCESS"
    }
  ]
};

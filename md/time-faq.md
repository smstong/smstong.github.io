**date and time**
# Some examples of ISO 8601 date and time format

Instant date and time
```
2024-01-23T14:02:24         # local time without timezone info (T is time designator)
2024-01-23T14:02:24Z        # time in Zulu time zone. (Z for Zulu timezone)
20240123T140224Z            # standard form of above time 
2024-01-23T14:02:24-5:00    # timezone is 5 hours behind
2024-01-23T14:02:24.233     # 0.233 second after the second (any pricision is allowed)
```

Time duration
```
P3M                    # duration of 3 months. (P stands for Period)
PT3M                   # duration of 3 minutes. (T is time disignator)
PT36H                  # duration of 36 hours.
PT1DT12H               # duration of 1 day and 12 hours.
```

# How to convert Unix epoch to string?
STRING "@unix-epoch" is used by --date arg.
```
date --date @1720626081
```

# How convert a date string to Unix epoch?
FORMAT "+%s" is used.
```
date +%s
```
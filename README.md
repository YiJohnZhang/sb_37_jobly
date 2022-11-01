# sb_37_jobly
Jobly. Springboard Cumulative Project, publicy viewable.

## Time Tracker
|Entry No.|Assignment|Date|Time|Time Elasped (min)|
|-|-|-|-|-|
|01|Setup and pseudo-code.|2022-10-17|20:18 - 21:10|52|
|02|Setup app.|2022-10-22|17:45 - 18:14|29|
|03|Continue setting up the app.|2022-10-22|19:58 - 22:23|145|
|04|Continue setting up the app.|2022-10-25|21:52 - 22:32|40|
|05|Continue setting up the app.|2022-10-25|22:33 - 23:33|60|
|06|Need to fix tests.|2022-10-25|23:35 - 23:54|19|
|07|Clean up initial application.|2022-10-26|00:34 - 00:51|17|
|08|Part 4 deliverable.|2022-10-26|09:07 - 09:48|41|
|09||2022-10-26|10:57 - 12:49|112|
|10||2022-10-30|10:48 - 12:10|82|
|11|**Part 4** TDD|2022-10-30|15:56 - 17:18|82|
|12|Finished `Jobs` model.|2022-10-30|18:38 - 20:28|110|
|13||2022-10-30|22:11 - 23:07|56|
|14||2022-10-31|14:25 - 16:34|129|
|15|finally done|2022-10-31|21:52 - 23:53|61|
|16|edit `README.md` typos|23:58 - 25:59|1|
||||**Total Time**|1036 minutes|

14: 974 minutes
darn, could have been 274 minutes (4 hours 34 minutes less if I just took the vanilla codebase)

# Specifications:
- Base Assignment Requirements
- All `Further Study` Specifications
	- Random Password Generation with Admin create route
	- Using a `ENUM`sql type for `application_state`.
	- Added the following relations:
		- `technologies` relation.
		- `technologies_users` relation, `technologies` and `users` `JOIN`sql table.
		- `technologies_jobs` relation, `technologies` and `jobs` `JOIN`sql table.
- Interesting that this application doesn't have a `login` route other than indirectly through `/auth/token`. The specification sheet doesn't say to create one.

# Part 4: Jobs `FLOAT`sql vs. `NUMERIC`sql
The `pg` library returns a string from a `NUMERIC`sql type. I hypothesize this is so because JavaScript `Number`js only has a floating-precision number type. Therefore to keep it exact, it is a `String`js.

A SQL `FLOAT`sql/`FLOAT(n)`sql is a [**floating-precision** number data type](https://en.wikipedia.org/wiki/Single-precision_floating-point_format): it stores the number in three portions:
- the number itself as a fraction, **significand**,
- by representing it as an **exponent** of 10,
- with an optional bit for the number's **sign**.
- The precision of the number stored in the data-type is thus limited to the number of bits allocated to the significand.

A SQL `NUMERIC(precision, scale)`sql is a **fixed-precision** number data type: it stores the number directly as it is and scales the number that is fixed upon initialization. The scale represents the placement of the decimal point. As of SQL, *precision* represents the total number of digits; and *scale* represents the implicit placement of the decimal point to attach.

In summary, both floating-precision and fixed-precision both represents the number it stores in scientfiic notation --as a power of 10. However, a floating-precision number can represent more numbers than the number of bits allocated to significand at the cost of precision beyond said number; while a fixed-precision number is only capable of representing the number of bits it has been allocated at the cost of representing far fewer numbers than that of a floating-precision number.
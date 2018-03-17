Hey guys. This file should explain what I did with the AddRoutines() and AddWeeklySchedule()
procedures. I wanted a way to perform multiple inserts within a single procedure. I learned
that MySQL supports JSON as a data type and I found a way to retrieve data from a JSON formatted
string and perform multiple inserts within a while loop. It just seemed like a more elegant solution. 
<IMPORTANT> I tested this out on my computer and it works but I can understand if it is weird
to work with. If you want, I can break them apart so you can perform multiple inserts manually.
Just ask. Anyway, here is how these procedures work.

AddRoutines():
	The JSON should be formatted as follows: 
					
				{"Workouts": [[WorkoutID1,Reps1,Weight1],[WorkoutID2,Reps2,Weight2],...]}
				
	A routine is composed of multiple workouts. This allows you to list all of the workouts that
	compose a single routine. It is an array of arrays. Each entry is composed of 3 parts. First is
	the workout id. Next is the number of reps. Finally is the amount of weight needed. If no weight
	is needed for the exercise, we can leave it as null. Just type null in all lower case. Separate
	each entry with a comma and list as many workouts as you like.
	
	As an example, here is how you would write two workouts with the IDs 4 and 8. The first one is 12
	reps with 10 lbs. The second is 20 reps without any weight.
	
				{"Workouts": [[4,12,10],[8,20,null]]}

AddWeeklySchedule():
	The SJON should be formatted as follows:
	
				{"Schedule": [[RoutineID1,Day1,Time1],[RoutineID2,Day2,Time2],...]}
				
	A weekly schedule is composed of multiple routines. This allows you to list the routines as an array of 
	arrays. Each entry is composed of 3 parts. First is the RoutineID, Next is the day the routine should be
	performed. It is stored as an tiny integer. Use 0 for Sunday, 1 for Monday and so on. Time is stored as
	a string. Use the format HH:MM. It is in military time so keep that in mind. You can use this to create
	an entire schedule in 1 go or add each routine individually. Size shouldn't matter 
	
	As an example, here is how you would write two routines with IDs 6 and 2. The first one is Sunday at 12pm 
	and the second one is at 2:30pm on Monday
	
				{"Schedule": [[6,0,"12:00"],[2,1,"14:30"]]}
				
I hope that isn't too hard to work with. If you have any questions, just ask. If you have any suggestions
or changes that make your work easier, I'm open to them. Just let me know. 
/**
 * Copyright (c) 2018
 *
 * This is a time object for a timer and/or progress/scrub bar
 * 
 * @summary JavaScript Time Object
 * @author Andrew Pankow <apankow1234@gmail.com>
 */

let _toSeconds = [1,60,3600,86400,604800,31449600];
let _toNext    = [60,60,24,7,52];
let _numParts  = _toSeconds.length;

function printClockFmt(totalSeconds=0)
{
	let iter = _numParts - 1;
	var timeString = "";
	for(var i = iter; i >= 0; i--)
	{	
		var calc = Math.floor(totalSeconds / _toSeconds[i]);
		var stringPiece = String(calc);
		if(i != iter)
		{
			stringPiece = String(Math.floor(calc % _toNext[i])|0);
			let proper = String(_toNext[i]).length;
			while(stringPiece.length > proper) stringPiece = stringPiece.substr(1);
			while(stringPiece.length < proper) stringPiece = "0"+stringPiece;
		}
		timeString += stringPiece;
		if(i != 0) timeString += ":";
	}
	return timeString;
}

function clockToSec(timeString="")
{
	let parts = timeString.split(":");
	var conversion = 0.0;
	if(parts.length > _numParts)
	{
		return conversion; /*Still has to be real-ish, otherwise 0*/
	}
	var c = 0;
	for(var i = parts.length; i > 0; i--)
	{
		conversion += parseFloat(parts[i-1]|0) * parseFloat(_toSeconds[c++]);
	}
	return conversion;
}

function stringToSec(timeString="")
{
	if((timeString.indexOf(":") > -1 ? true : false ))
	{
		return clockToSec(timeString);
	}
	else if(!isNaN(parseFloat(timeString)))
	{
		return parseFloat(timeString);
	}
	else
	{
		return 0.0;
	}
}



class ClockObj
{
	constructor(timeString="")
	{
		this.totalSeconds = 0;
		if( timeString != "" && timeString != null )
		{
			this.addTime(timeString);
		}
	}

	reset()
	{
		this.totalSeconds = 0.0;
	}

	addSeconds(seconds=1) {
		this.totalSeconds += parseFloat(seconds);
	}

	remSeconds(seconds=1) {
		this.totalSeconds -= parseFloat(seconds);
		if(this.totalSeconds < 0)
			this.reset();
	}

	addTime(timeString="")
	{
		this.addSeconds(stringToSec(timeString));
	}

	remTime(timeString="")
	{
		this.remSeconds(stringToSec(timeString));
	}

	setTime(timeString="")
	{
		this.reset();
		this.addTime(timeString);
	}
}
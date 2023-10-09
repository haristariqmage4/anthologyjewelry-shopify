// From github - tomsmeding / romanDay

var daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31],
    monthNames=[
    	["Ian","Feb","Mar","Apr","Mai","Iun","Qui","Sex","Sep","Oct","Nov","Dec"],
    	["Ianuarius","Februarius","Martius","Aprilis","Maius","Iunius","Quintilis","Sextilis","September","October","November","December"]
    ],
    nonaeDate=[5,5,7,5,7,5,7,5,5,7,5,5];

function romanDay(date,expanded){
	var res="",prefixdays=0,shiftMonth=false;
	var d=date.getDate(),m=date.getMonth(),y=date.getFullYear(),
	    nonae=nonaeDate[m],idus=nonae+8;
	if(d!=1&&d<=nonae){
		prefixdays=nonae-d+1;
		res=expanded?"Nonae":"Non.";
	} else if(d!=1&&d<=idus){
		prefixdays=idus-d+1;
		res=expanded?"Idus":"Id.";
	} else {
		if(d==1)prefixdays=0;
		else {
			prefixdays=daysInMonth[m]+1-d+1;
			shiftMonth=true;
		}
		res=expanded?"Kalendae":"Kal.";
	}
	if(prefixdays==2)res=(expanded?"pridie ":"prid. ")+res;
	else if(prefixdays>2)res=romanNumeral(prefixdays)+" "+res;
	if(prefixdays>1)res=(expanded?"ante diem ":"a.d. ")+res;
	if(shiftMonth){
		m++;
		if(m==12){
			m=0;
			y++;
		}
	}
	res+=" "+(expanded?monthNames[1][m]+" annus ":monthNames[0][m]+". an. ")+romanNumeral(Math.abs(y));
	return res;
}

var romanNumeralTenline=["","I","II","III","IV","V","VI","VII","VIII","IX"];
function romanNumeral(n){
	var res="";
	if(n>=1000){
		res+=new Array(~~(n/1000+1)).join("M");
		n%=1000;
	}
	res+=romanNumeralTenline[~~(n/100)].replace(/[IVX]/g,function(c){
		return "CDM"["IVX".indexOf(c)];
	});
	n%=100;
	res+=romanNumeralTenline[~~(n/10)].replace(/[IVX]/g,function(c){
		return "XLC"["IVX".indexOf(c)];
	});
	n%=10;
	res+=romanNumeralTenline[n];
	return res;
}
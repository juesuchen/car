package com.minisoft.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateKit {
	
	public static String dateFormat = "yyyy-MM-dd";
	public static String timeFormat = "yyyy-MM-dd HH:mm:ss";

	public static Date toDate(String dateStr) {
		Date result = null;
		try {
			result = new SimpleDateFormat(dateFormat).parse(dateStr);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return result;
	}
	
	public static Date toDateTime(String dateStr) {
		Date result = null;
		try {
			result = new SimpleDateFormat(timeFormat).parse(dateStr);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return result;
	}
	
	public static String toDateStr(Date date) {
		return new SimpleDateFormat(dateFormat).format(date);
	}
	
	public static String toDateTimeStr(Date date) {
		return new SimpleDateFormat(timeFormat).format(date);
	}
}

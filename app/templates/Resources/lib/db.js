exports.CreateDatabase = function(version) {
	var DB = Ti.Database.open(<%= safeAppName %>.DatabaseName);
	var DateCreated = new Date().getTime();
	DB.execute("CREATE TABLE IF NOT EXISTS db_version(ID INTEGER PRIMARY KEY, Version TEXT, DateCreated INTEGER)");
	DB.execute("INSERT INTO db_version (Version, DateCreated) VALUES (?, ?)", version, DateCreated);
	Ti.API.debug('Database Created');
	DB.close();
};

exports.Select = function(TableName, Fields, Where) {
	var Results = [];
	var DB = Ti.Database.open(<%= safeAppName %>.DatabaseName);
	var i;
	var DataRow;
	var FieldCount;
	var SQL = CreateSelect(TableName, Fields, Where);

	Ti.API.debug(SQL);
	var SqlResult = DB.execute(SQL);
	if (<%= safeAppName %>.UserPlatform === 'android') {
		FieldCount = SqlResult.fieldCount;
	} else if (<%= safeAppName %>.UserPlatform === 'iphone') {
		FieldCount = SqlResult.fieldCount();
	}
	Ti.API.debug("Rows returned: " + SqlResult.rowCount);

	while(SqlResult.isValidRow()) {
		DataRow = {};
		for (i=0;i<FieldCount;i++) {
			DataRow[SqlResult.fieldName(i)] = SqlResult.field(i);
		}
		Results.push(DataRow);
		SqlResult.next();
	}

	DB.close();
	return Results;

};

exports.SelectScalar = function(TableName, Field, Where) {
	var Result = null;
	var DB = Ti.Database.open(<%= safeAppName %>.DatabaseName);
	var i;
	var DataRow;


	var SQL = CreateSelect(TableName, Field, Where);
	Ti.API.debug(SQL);

	var SqlResult = DB.execute(SQL);

	if (SqlResult.isValidRow()) {
		Result = SqlResult.field(0);
	}

	DB.close();
	Ti.API.debug('SQL Scalar result: ' + Result);
	return Result;
};

exports.Insert = function(TableName, ValuesObj) {
	var Fields = [], Values = [];
	var i;
	var NewRowID;
	var DB = Ti.Database.open(<%= safeAppName %>.DatabaseName);

	for (var Field in ValuesObj) {
		Fields.push(Field);

		if (ValuesObj[Field] === false)
			Values.push(0);
		else if (ValuesObj[Field] === true)
			Values.push(1);
		else
			Values.push(ValuesObj[Field]);
	}

	var SQL = "INSERT INTO " + TableName + " (";
	for (i=0;i<Fields.length;i++) {
		SQL += (i > 0) ? ", " + Fields[i] : Fields[i];

	}
	SQL += ") VALUES (";
	for (i=0;i<Values.length;i++) {
		SQL += (i > 0) ? ", ?" : "?";
	}
	SQL += ")";

	Ti.API.debug(SQL + ' | Values : ' + Values.join(', '));
	var Result = DB.execute(SQL, Values);
	NewRowID = DB.lastInsertRowId;
	Ti.API.debug('SQL Insert new row ID: ' + NewRowID);
	DB.close();

	return NewRowID;
};

exports.Update = function(TableName, ValuesObj, Where) {
	var Fields = [], Values = [];
	var NewRowID;
	var DB = Ti.Database.open(<%= safeAppName %>.DatabaseName);

	for (var Field in ValuesObj) {
		Fields.push(Field);

		if (ValuesObj[Field] === false)
			Values.push(0);
		else if (ValuesObj[Field] === true)
			Values.push(1);
		else
			Values.push(ValuesObj[Field]);
	}

	var SQL = "UPDATE " + TableName + " SET ";
	for(var i=0;i<Fields.length;i++) {
		if (i > 0)
			SQL += ", ";
		SQL += Field[i] + "=?";
	}

	if (Where != undefined)
		SQL += " WHERE " + Where;

	Ti.API.debug(SQL + " | Values : " + Values.join(', '));
	var Result = DB.execute(PrepSQL(SQL), Values);
	var RowsAffected = DB.getRowsAffected();
	DB.close();
	Ti.API.debug('SQL Update Rows Affected: ' + RowsAffected);
	return  RowsAffected;
};


exports.Delete = function(TableName, Where) {
	var DB = Ti.Database.open(<%= safeAppName %>.DatabaseName);

	var SQL = "DELETE FROM " + TableName;
	if (Where != undefined)
		SQL += " WHERE " + Where;

	Ti.API.debug(SQL);
	var Result = DB.execute(PrepSQL(SQL));
	var RowsAffected = DB.getRowsAffected();
	DB.close();
	Ti.API.debug('SQL Delete rows affected: ' + RowsAffected);
	return  RowsAffected;
};

function CreateSelect(TableName, Fields, Where) {
	if (Fields == undefined)
		Fields = "*";

	//Make sure Fields is an array
	Fields = [].concat(Fields);

	var SQL = "SELECT ";
	for(i=0;i<Fields.length;i++) {
		if (i > 0)
			SQL += ", ";
		SQL += Fields[i];
	}
	SQL += " FROM " + TableName;
	if (Where != undefined)
		SQL += " WHERE " + Where;

	return PrepSQL(SQL);
}

function PrepSQL(SQL) {
	SQL = SQL.replace(/false/gi, "0");
	SQL = SQL.replace(/true/gi, "1");
	return SQL;
}

//if(!module || !module.exports){var module={'exports':{}};}//for console testing
module.exports.getRandomInt=function(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
module.exports.convert_args=function(argsIn){
    if(typeof(argsIn)==='object' && argsIn.length>0){
        var out_args=[];
        for(var arg_inc=0;arg_inc<argsIn.length;arg_inc++){out_args.push(argsIn[arg_inc]);}
        return out_args;
    }
    return [];
}
module.exports.regexp_escape=function(strIn){// http://stackoverflow.com/questions/494035/how-do-you-pass-a-variable-to-a-regular-expression-javascript/494122#494122
    return strIn.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
}
module.exports.isNode=function(){
    if(typeof(process)!=='undefined' && typeof(process.versions)!=='undefined' && typeof(process.versions)!=='undefined' && typeof(process.versions.node)!=='undefined'){
        return true;
    }
    return false;
}
module.exports.check_strip_last=function(stringIn,checkFor){
	var output="";
	if(typeof(stringIn)==='string' && (stringIn.indexOf(checkFor)!==-1)){//found
		var startPoint=stringIn.length-checkFor.length,
            tmp=stringIn.substr(startPoint,checkFor.length);
		if(tmp==checkFor){
            output=stringIn.substr(0,(stringIn.length-checkFor.length));}
		else{
            output=stringIn;}
		return output;
	}else{
		return stringIn;}
}
module.exports.check_strip_first=function(stringIn,checkFor){
	var output="";
	if(typeof(stringIn)==='string' && (stringIn.indexOf(checkFor)!==-1)){//found
		var startPoint=stringIn.length-checkFor.length,
		tmp=stringIn.substr(0,checkFor.length);
		if(tmp==checkFor){
			output=stringIn.substr(checkFor.length,stringIn.length);}
		else{
			output=stringIn;}
		return output;
	}else{
		return stringIn;}
}
module.exports.basic_str=function(stringIn){//basic string check.  It a Number or a string? Is it empty?
	var tmp=stringIn;
	if(typeof(stringIn)==='string'){
		tmp=stringIn.trim();
		if(tmp.length>0){
			return true;}
		else{
			return false;}
	}else if(typeof(stringIn)=='number' && !isNaN(stringIn)){
		if(tmp.toString().length>0){
			return true;}
		else{
			return false;}
	}else{
		return false;}
};
module.exports.obj_valid_key=function(obj,key){
    var result=false;
    var empty_obj;
    if(obj instanceof Array){empty_obj=[];}//check for array first as an array comes up both as array and object
    else if(obj instanceof Object){empty_obj={};}
    else{return false;}
    if(typeof(empty_obj)=='undefined'){//instanceof didn't work! IE9!?
	    if(obj.constructor==Object){empty_obj={};}
	    else if(obj.constructor==Array){empty_obj=[];}
    }
    for(var k_e_y_check in obj){
	    var do_result='proceed';
	    for(var empty_key in empty_obj){
		    if(empty_key==k_e_y_check){do_result='continue';break;}}//it matches! So this key is a prototype

	    //if(typeof(empty_obj[k_e_y_check])!='undefined'){continue;}//trying to ignore prototypes <- ISSUE WITH IE9 Uuuuugggg
	    if(do_result=='continue'){continue;}
	    if(k_e_y_check===key){result=true;break;}
    }
    return result;
};
module.exports.array_del_at=function(arrayIn, indexNum){
    if(!(arrayIn instanceof Array)){throw new Error("array_del_at was not passed an array");}
    else if(typeof(indexNum)!=='number' && !(indexNum instanceof Array)){throw new Error("array_del_at was not pass a valid indexNum");}
    if(!(indexNum instanceof Array)){indexNum=[indexNum];}
    for(var ni=0;ni<indexNum.length;ni++){
        if(typeof(indexNum[ni])!=='number'){throw new Error("array_del_at was not pass a valid indexNum.  Must be a number");return;}}
    var len=arrayIn.length,expected=0,needs_redex=false;
    for(var ti=0;ti<len;ti++){
        if(ti!==expected){needs_redex=true;break;}expected++;}
    arrayIn=(needs_redex?this.array_redex(arrayIn):arrayIn);
    //we're sane! now do this!
    indexNum.sort().reverse();
    for(var ni=0;ni<indexNum.length;ni++){
        arrayIn.splice(indexNum[ni]-1,1);
    }
};
module.exports.array_redex=function(arrayIn){//if you unset an array it creates a hole in the index.  This reindexes your array
	if(typeof(arrayIn)!='object'){return false;}
	var is_valid_arr;//=undefined

	if(arrayIn instanceof Array){is_valid_arr=true;}//check for array first as an array comes up both as array and object
	else if(arrayIn instanceof Object){is_valid_arr=false;}
	if(typeof(is_valid_arr)=='undefined'){//instanceof didn't work! IE9!?
		if(arrayIn.constructor==Array){is_valid_arr=true;}
		else if(arrayIn.constructor==Object){is_valid_arr=false;}
	}
	if(typeof(is_valid_arr)=='undefined'){is_valid_arr=(Object.prototype.toString.call(arrayIn) === '[object Array]');}//last resort - probably related to the above bug I introduced :(

	if(is_valid_arr!==true){return false;}
	var old=arrayIn.concat([]),
		output=[];//break live link
	for(var k in old){
		if(this.obj_valid_key(old,k)){//valid key?!
			output.push(old[k]);}}//all brackets's closed here
	return output;
};
module.exports.array_keys=function(objIn){//shallow get key
	if(typeof(objIn)=='object'){
		var output=[];
		for(var _a_r_r_a_y_key_test in objIn){
			if(this.obj_valid_key(objIn,_a_r_r_a_y_key_test)){output.push(_a_r_r_a_y_key_test);}
		}
		return (output.length===0?false:output);
	}
	return false;
};
module.exports.in_array=function( elem, arr, i ) {//stolen from jQuery
	return arr == null ? -1 : indexOf.call( arr, elem, i );
};
module.exports.in_object=function(valIn,objectIn){//similar to in_array
	for(var oKey in objectIn){
		if(this.obj_valid_key(objectIn,oKey)){
			if(objectIn[oKey]===valIn){return oKey;}
		}
	}
	return -1;
}
/*
    // find data.id===1
    utils.array_object_search([
            {'data':{'id':1, 'title':'Sample Title 1'}},
            {'data':{'id':1, 'title':'Sample Title 2'}},
            {'data':{'id':2, 'title':'Sample Title 3'}},
            {'data':{'id':3, 'title':'Sample Title 4'}}
        ],
        {'data':{'id':undefined}}, 1)
    // \\ find data.id===1
 */
module.exports.array_object_search=function(arrIn,keyIn,valIn,doDebug){//if keyIn is an object it'll try reduce itself until it matches the key structure found
	if(typeof(arrIn)!=='object' || !(arrIn instanceof Array)){return [];}
	var output=[],
		key_index=(typeof(keyIn)==='object'?this.array_keys(keyIn):[]);
	for(var ai=0;ai<arrIn.length;ai++){
		if(typeof(keyIn)!=='object'){//not an object! Not a problem! Just do!
//if(doDebug){console.log('keyIn('+typeof(keyIn)+'): ',keyIn,"\n",'arrIn['+ai+']: ',arrIn[ai]);}
			if(this.obj_valid_key(arrIn[ai],keyIn)){
//if(doDebug){console.log('array_object_search obj test ',keyIn,' TEST: (',arrIn[ai][keyIn],' === ',valIn,': ',(arrIn[ai][keyIn]===valIn || arrIn[ai][keyIn]==valIn?'TRUE':'FALSE'),')');}
				if(arrIn[ai][keyIn]===valIn){output.push(arrIn[ai]);}
				else if(arrIn[ai][keyIn]==valIn){output.push(arrIn[ai]);}
			}
		}else{//sifting down through the provided key
			for(var ki=0;ki<key_index.length;ki++){
				var is_reduced=(typeof(keyIn[key_index[ki]])=='object'?false:true),//did we get reduced to a scalar value?  Basically anything but an object.  We might want a function!
					tmp=this.array_object_search([ (is_reduced?arrIn[ai]:arrIn[ai][ (key_index[ki]) ]) ],(is_reduced?key_index[ki]:keyIn[key_index[ki]]),valIn,doDebug);
//if(doDebug){console.log('array_object_search(',(is_reduced?arrIn[ai]:arrIn[ai][ (key_index[ki]) ]),' , ',valIn,') tmp',tmp);}
				if(tmp.length>0){output.push(arrIn[ai]);}
			}
		}
	}
	return output;
};
module.exports.url_chomp=function(str,chompMore){
	if(!chompMore){chompMore=[];}
	if(typeof(chompMore)!='object'){chompMore=[];}
	var chop=['https', 'http', '//', '://'];
	if(chompMore.length>0){chop=chop.concat(chompMore);}
	for(var c=0;c<chop.length;c++){
		str=this.check_strip_first(str, chop[c]);}
	return str;
};
module.exports.get_ext=function(str){
    if(typeof(str)!=='string'){return str;}
    var ex_qry=str.split('?'),
        str_clean=(str.indexOf('?')!==-1?ex_qry[0]:str),
        ex_ahr=str_clean.split('#');
    str_clean=(str_clean.indexOf('#')!==-1?ex_ahr[0]:str_clean);
    if(str_clean.indexOf('.')===-1){return '';}
	var exp=str_clean.split('.');
    return exp[exp.length-1];
};
module.exports.alpha_num_inc=function(str,charRange){
    if(!this.basic_str(str)){str='';}
    if(typeof(charRange)!=='object'){charRange=[97,122];}//65-90 A-Z || 97-122 a-z
    charRange=charRange.concat([]);
    if(charRange.length===1){
        if(charRange[0]>=97 && charRange[0]<122){charRange.push(122);}
        else if(charRange[0]>=65 && charRange[0]<90){charRange.push(90);}

    }
    if(charRange.length<2){return false;}
    var new_str='',
        next_inc=0;
    for(var i=str.length-1;i>=0;i--){//reverse loop
        if((str[i].charCodeAt(0)+1)>charRange[1]){//does incrementing exceed character range
            next_inc++;
            new_str=String.fromCharCode(charRange[0])+new_str;//set to min
        }else{
            if(next_inc>0){
                next_inc--;
                if((str[i].charCodeAt(0)+1)>charRange[1]){//does incrementing exceed character range
                    next_inc++;
                    new_str=String.fromCharCode(charRange[0])+new_str;
                }else{//otherwise increment normally
                    new_str=String.fromCharCode( (str[i].charCodeAt(0)+1) )+new_str;
                }
            }else{
                if(new_str.length===0){//if first pop on
                    if((str[i].charCodeAt(0)+1)>charRange[1]){//does incrementing exceed character range
                        next_inc++;
                        new_str=String.fromCharCode(charRange[0])+new_str;
                    }else{//otherwise increment normally
                        new_str=String.fromCharCode( (str[i].charCodeAt(0)+1) )+new_str;
                    }
                }else{
                    new_str=str[i]+new_str;
                }
            }
        }
    }
    if(next_inc>0){
        new_str=String.fromCharCode(charRange[0])+new_str;
    }
    return new_str;
};
module.exports.zero_pad_front=function(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};
module.exports.is_scalar=function(arg) {
  return (/string|number|boolean/).test(typeof(arg));
};

module.exports.delete_dir_all=function(fs,path) {//http://www.geedew.com/remove-a-directory-that-is-not-empty-in-nodejs/
//console.log('delete_dir_all - path: ',path);
    var self=this;
    if( fs.existsSync(path) ) {
//console.log(' --- path exists: ',path);
        fs.readdirSync(path).forEach(function(file,index){
            var curPath = path + "/" + file,
                stats=fs.statSync(curPath);

            if(stats.isDirectory()) { // recurse
//console.log(' --- path: ',path,' curPath ',curPath);
                self.delete_dir_all(fs,curPath);
            } else if(stats.isFile()) { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};
module.exports.get_auth_creds=function(urlStr, pkgObjs){
    var p_url=pkgObjs.url.parse(urlStr);//parsed url
//console.log('this.obj_valid_key(pkgObjs.config.auth_creds, p_url.host): ',this.obj_valid_key(pkgObjs.config.auth_creds, p_url.host),'pkgObjs.config.auth_creds',pkgObjs.config.auth_creds,'p_url.host',p_url.host);
    return (this.obj_valid_key(pkgObjs.config.auth_creds, p_url.host)?pkgObjs.config.auth_creds[ p_url.host ]:false);
};
module.exports.parse_subtext=function(str,objs,nullRep){
    return str.replace(/\{([^"'].+?)\}/g, function(m, key, url) {
        var rep_fail=(typeof(nullRep)==='undefined'?objs[key]:nullRep);
        if(typeof(rep_fail)==='undefined'){rep_fail='{'+key+'}';}
        return (typeof(objs[key])!=='undefined'?objs[key]:rep_fail);
    });
};
module.exports.clone=function(obj){
    var self=this,copy;
    if (null===obj || typeof(obj)!=='object'){return obj;}// Handle the 3 simple types, and null or undefined
    else if(obj instanceof Array){return obj.concat([]);}// Handle Array
    else if(typeof(obj)==='object'){// Handle Object
        if(obj instanceof Date){
            return new Date(obj.toISOString());
        }else if(obj instanceof Object){
            copy={};
            for(var attr in obj){try{copy[attr]=self.clone(obj[attr]);}catch(errToken){}}
            return copy;
        }else{
            var constructor_clone = function(o){
            	var clonedobj=new o.constructor;
            	for(var clonekey in o){
            		try{clonedobj[clonekey]=self.clone(o[clonekey]);}catch(errToken){}}
            	return clonedobj;
            };
            return constructor_clone(obj);
        }
    }
    throw new Error("Unable to copy obj! Its type isn't supported.");
    return obj;
};
/*
default_currency={'symbol':'$','int_sep':',', 'dec_sep':'.' , 'ind_location':'prefix' },
        objectize_num=function(num,opts){//sorry this evolved to this rather than reuse what was available
            opts = merge(true,{},default_currency,(typeof(opts)==='object'?opts:{}));
            if(typeof(num)!=='number'){throw new Error("td-core objectize_num() was not passed type 'number'; was passed '"+num+"'.");}
            var num_str=num.toString(),
                output={'dec':"00",'int':"0",'dec_sep':opts.dec_sep,'int_sep':opts.int_sep,'num':0};
            if(num_str.indexOf('.')!==-1){//real/decimal number?
                var dec_ex=num_str.split('.');
                output.int=dec_ex.slice(0, dec_ex.length-1).join('');
                output.dec=dec_ex.slice(-1).join('');//join but remove the int part
            }else{//int number
                output.int=num.toString();
                output.dec="00";
            }
            if(output.dec.length<2){//padd out if its 0.5 (50 cents)
                for(var d=output.dec.length;d<2;d++){
                    output.dec=output.dec + "0";
                }
            }
            output.num=parseFloat(output.int+'.'+output.dec);
            if(output.int.length>3){
                var new_int='',
                    inc=0;
                for(var i=output.int.length-1;i>=0;i--){
                    new_int=output.int[i] + (inc%3!==0 || inc===0?'':output.int_sep) + new_int;
                    inc++;
                }
                output.int=new_int;
            }

            var prefix=(opts.ind_location==='prefix'?opts.symbol:''),
                suffix=(opts.ind_location==='suffix'?' '+opts.symbol:'');

            output.toString=function(){return (prefix) + output.int + output.dec_sep + output.dec + (suffix);};
            return output;
        },
        clean_num=function(num, opts){//clean up the number so parseFloat can convert correctly despite localization
            opts = merge(true,{},default_currency,(typeof(opts)==='object'?opts:{}));
            var num_str=num.toString().replace(new RegExp(utils.regexp_escape(opts.int_sep),'gi'),'').replace(new RegExp(utils.regexp_escape(opts.dec_sep),'gi'),'.'),
                dec_count=(num_str.match(new RegExp('.','gi')) || []).length;
            if(dec_count>1){
                var dec_ex=num_str.split('.'),
                    new_num_str='';
                for(var i=dec_ex.length-1;i>=0;i--){
                    new_num_str=(i===1?'.':'') + dec_ex[i] + new_num_str;
                }
                num_str=new_num_str;
            }
            return num_str;
        },
        formatCurrency=function(numIn, opts) {
            opts = merge(true,{},default_currency,(typeof(opts)==='object'?opts:{}));
            opts.ind_location = opts.ind_location.toLowerCase();
            opts.ind_location = (opts.ind_location!=='prefix' || opts.ind_location!=='suffix'?'prefix':opts.ind_location);

            return objectize_num(parseFloat(clean_num((typeof(numIn)!=='undefined' && !isNaN(numIn) && numIn!==null?numIn.toString():'0')), opts), opts).toString();
        };
//var currency_obj=$rootScopeNumberHelper({'sep':{'int':opts.int_sep, 'dec':opts.dec_sep}, 'unit':opts.symbol});
//opts.int_sep=' ';opts.dec_sep=',';
//console.log("=================== UNIT TEST int: "+opts.int_sep+"  dec: "+opts.dec_sep+" =======================");
//['1 525 123 456,98,765,432','9456,92', '2 456,9', '320', ',51113333', ',2768,882', '1,525,123,456.98.765.432', '9456.92', '2,456.9', '320', '.51113333', '.2768.882'].forEach(function(v){console.log(v+': ',clean_num(v));});
//['1,525,123,456.98.765.432','9456.92','2,456.9','320','.51113333','.2768.882','1.525.123.456.98.765.432','9456.92','2.456.9','320','.51113333','.2768.882'].forEach(function(v){console.log(v+': '.clean_num(v));});

*/

function CalculateCIDR(cidr) {
	var cidr = cidr.split("/");
	
	var netmask = ""; //子网掩码
	var netid = ""; //网络号
	var hostid = ""; //主机号
	var netaddress = ""; //网络地址
	var broadcast = ""; //广播地址
	var startip = ""; //起始IP
	var endip = ""; //结束IP
	var hostnum; //主机数量（容纳IP数量）
	
	//第一步：计算二进制子网掩码
	for(var i=0;i<cidr[1];i++) {
		netmask = netmask + "1";
	};
	
	for(var i=0;i<32-cidr[1];i++) {
		netmask = netmask + "0";
	};
	
	//第二步：IP地址与子网掩码做与运算得出网络号
	var ip_sec = praseIpToBinary(cidr[0]);
	
	for(var i=0;i<32;i++) {
		if(ip_sec.charAt(i) == netmask.charAt(i)) {
			netaddress = netaddress + "1";
		} else {
			netaddress = netaddress + "0";
		}
	}
	
	netid = netaddress.substr(0,cidr[1]); //网络号保持不变
	
	//第三步：计算网络地址（网络号保持不变，主机号全为0）
	for (var i=0;i<32-cidr[1];i++) {
		hostid = hostid + "0";
	}
	
	netaddress = praseBinaryToIp(netid + hostid);
	
	//第四步：计算起始IP（网络号保持不变，主机号最后一位为1）
	hostid = "";
	for (var i=0;i<31-cidr[1];i++) {
		hostid = hostid + "0";
	}
	hostid += "1";
	startip = praseBinaryToIp(netid + hostid);
	
	//第五步：计算广播地址（网络号保持不变，主机号全为1）
	hostid = "";
	for(var i=0;i<32-cidr[1];i++) {
		hostid = hostid + "1";
	}
	broadcast = praseBinaryToIp(netid + hostid);
	
	//第六步：计算结束IP（网络号保持不变，主机号最后一位为0）
	hostid = "";
	for (var i=0;i<31-cidr[1];i++) {
		hostid = hostid + "1";
	}
	hostid += "0";
	endip = praseBinaryToIp(netid + hostid);
	
	//计算主机数量
	hostnum = Math.pow(2,32-cidr[1])-2;
	
	//封装数据
	var result = [
		praseBinaryToIp(netmask), //子网掩码
		netaddress, //网络地址
		broadcast, //广播地址
		startip, //起始IP
		endip, //结束IP
		hostnum, //主机数量（容纳IP数量）
	];
	
	return result;
}

//IP转二进制
function praseIpToBinary(ipAddress) {
  var numArray = ipAddress.split(".");
  
  var returnIpStr = "";
  
  for (var i = 0; i < 4; i++) {
    var curr_num = numArray[i];
    var number_Bin = parseInt(curr_num);
    number_Bin = number_Bin.toString(2);
    var iCount = 8-number_Bin.length;
    for (var j = 0; j < iCount; j++) {
      number_Bin = "0"+number_Bin;
    }
    returnIpStr += number_Bin;
  }
  
  return returnIpStr;
}

//二进制转IP
function praseBinaryToIp(binary) {
	var ipAddress = parseInt(binary.substr(0,8),2) + "." + parseInt(binary.substr(8,8),2) + "." + parseInt(binary.substr(16,8),2) + "." + parseInt(binary.substr(24,8),2);
	return ipAddress;
}

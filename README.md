# CIDR计算器
这是一个CIDR计算器

# 算法
核心算法文件是CalculateCIDR.js文件，算法大体步骤如下：
* 第一步：计算二进制子网掩码
* 第二步：IP地址与子网掩码做与运算得出网络号
* 第三步：计算网络地址（网络号保持不变，主机号全为0）
* 第四步：计算起始IP（网络号保持不变，主机号最后一位为1）
* 第五步：计算广播地址（网络号保持不变，主机号全为1）
* 第六步：计算结束IP（网络号保持不变，主机号最后一位为0）

# 示例
提供了一个基础示例，test.html文件，打开即可使用。



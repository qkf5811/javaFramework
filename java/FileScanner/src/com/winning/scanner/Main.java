package com.winning.scanner;

import java.io.File;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.Date;

public class Main {

	public static void main(String[] args) throws NoSuchAlgorithmException, IOException {
		FileScanner fs = new FileScanner();
		String path = "/home/qkf/github/framework/Spring_SpringMVC_Hibernate";
		String ignoreLocations = "";
		// 扫描1
		System.out.println("第一次扫描:");
		Date date = new Date();
		String scan = fs.scan(path, ignoreLocations, false);
		// 以下打印详细信息
		System.out.println("扫描一次耗时: " + (new Date().getTime()-date.getTime()) + " ms");
		System.out.println("result1: " + scan);
		System.out.println("扫描到的文件数量: " + fs.getFileInfo().size());
		System.out.println("扫描到的文件校验信息[目录(目录hashCode) 或 文件路径(文件名hashCode, 文件内容hashCode)]: ");
		for (String s : fs.getFileInfo()) {
			System.out.println(s);
		}
		System.out.println();
		System.out.println("扫描到的文件: ");
		for (File f : fs.getFiles()) {
			System.out.println(f.getAbsolutePath());
		}
		System.out.println();
		// 以上打印详细信息
		
		// 模拟不同的机器上的目录进行测试 : 第一次扫描后，新增文件，目录，修改文件内容
//		File f = new File(path + "qkf.txt");
//		f.renameTo(new File(path + "qkf.txt"));
//		FileOutputStream fos = new FileOutputStream(f);
//		fos.write("哈哈".getBytes());
//		fos.close();
		
		// 扫描2
		System.out.println("第二次扫描:");
     	String scan2 = fs.scan(path, ignoreLocations, false);
     	System.out.println("result2: " + scan2);
     	System.out.println("equal? " + scan.equals(scan2));
     	
     	// 其他方法
     	// Base64编码
//     	fs.base64Encode(str);
//     	fs.base64Decode(str);
     	// MD5
//     	fs.getMD5(); // 也就是scan方法的返回结果
//     	fs.getMD5(sb); // 得到sb的摘要信息
     	// GZIP
//     	fs.gzipCompress(str); // gzip压缩,如果用于传输的字符串过长，可以进行压缩
//     	fs.gzipUncompress(str) // gzip解压缩
     	
//     	fs.verifyFile(file); // 分析单个文件（目录或文件）, 返回：如果是目录:目录路径(目录的hashCode), 如果是文件:文件路径(文件名hashCode, 文件内容hashCode)
     	
     	// 传输：
     	// 如果需要完整的文件校验信息传输，就对fileInfo.toString()进行压缩，再进行传输
     	// 如果仅仅需要判断文件目录信息是否一致，
     	// 就传输scan方法的返回值（md5）或 fileInfo.toString()的hashCode （这个是数字,比较直观）
	}
}

package com.winning.scanner;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.nio.channels.FileChannel;
import java.nio.charset.Charset;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.zip.GZIPInputStream;
import java.util.zip.GZIPOutputStream;

import com.sun.org.apache.xerces.internal.impl.dv.util.Base64;

/**
 * 文件扫描校验
 * @author qkf
 */
public final class FileScanner {

	boolean printDetail = false;
	
	private String md5 = "";
	
	// Charset
	Charset cs = Charset.forName("GBK");

	// 记录文件校验信息
	private List<String> fileInfo;
	
	// 用于保存扫描到的文件
	private List<File> files;
	
	/**
	 * 文件校验信息的md5摘要
	 * @return
	 */
	public String getMD5() {
		return md5.toString();
	}
	
	/**
	 * 得到文件校验信息
	 * @return
	 */
	public List<String> getFileInfo() {
		return fileInfo;
	}

	/**
	 * 得到所有扫描到的文件（包括路径）
	 * @return
	 */
	public List<File> getFiles() {
		return files;
	}

	public FileScanner() {
		super();
	}
	
	/**
	 * 扫描方法
	 * @param location
	 *            扫描路径
	 * @param ignoreLocations
	 *            需要忽略的路径模式(可用通配符*，非贪婪模式)
	 * @param ignoreHiddenFiles
	 *            是否忽略隐藏文件
	 * @return 返回MD5摘要
	 */
	public String scan(String location, String ignoreLocations, boolean ignoreHiddenFiles) {
		// 每次调用进行初始化
		md5 = "";
		files = new ArrayList<File>();
		fileInfo = new ArrayList<String>();
		// 扫描
		scanFile(location, ignoreLocations, ignoreHiddenFiles);
		// 文件校验信息排序
		Collections.sort(getFileInfo());
		// 得到文件校验信息的md5
		if (printDetail) {
			System.out.println("fileInfo:" + getFileInfo().toString());
		}
		md5 = getMD5(getFileInfo().toString());
		return md5;
	}

	/**
	 * 得到MD5摘要
	 * @param sb
	 * @return
	 */
	public String getMD5(String sb) {
		MessageDigest md = null;
		String md5 = "";
		try { 
			md = MessageDigest.getInstance("MD5");
			String tmp =  new String(md.digest(sb.toString().getBytes()), "ISO-8859-1");
//			String tmp = String.valueOf(sb.hashCode());
			byte[] bytes = tmp.getBytes();
			if (printDetail) {
				System.out.println(Arrays.toString(bytes));
				System.out.println("md5: " + tmp);
			}
			md5 = tmp;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return md5.toString();
	}
	
	/**
	 * Base64编码
	 * @param str
	 * @return
	 */
	public String base64Encode(String str) {
		return Base64.encode(str.getBytes());
	}
	
	/**
	 * Base64解码
	 * @param str
	 * @return
	 */
	public String base64Decode(String str) {
		return new String(Base64.decode(str));
	}
	
	/**
	 * gzip压缩
	 * @param str
	 * @return
	 */
	public String gzipCompress(String str) {
		String result = "";
		GZIPOutputStream gOut = null;
		ByteArrayOutputStream out = null;
		try {
			out = new ByteArrayOutputStream();
			gOut = new GZIPOutputStream(out);
			gOut.write(str.getBytes());
			gOut.finish();
			gOut.flush();
			result = out.toString("iso-8859-1");
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if (out != null) {
					out.close();
				}
				if (gOut != null) {
					gOut.close();
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return result;
	}
	
	/**
	 * gzip解压
	 * @param str
	 * @return
	 */
	public String gzipUncompress(String str) {
		String result = "";
		GZIPInputStream gin = null;
		ByteArrayInputStream in = null;
		ByteArrayOutputStream out = null;
		try {
			in = new ByteArrayInputStream(str.getBytes("iso-8859-1"));
			gin = new GZIPInputStream(in);
			out = new ByteArrayOutputStream();
			int len = 0;
			byte[] buffer = new byte[1024*100];
			while ( (len = gin.read(buffer)) != -1 ) {
				out.write(buffer, 0, len);
			}
			result = out.toString();
		} catch (Exception e){
			e.printStackTrace();
		} finally {
			try {
				if (out != null) {
					out.close();
				}
				if (gin != null) {
					gin.close();
				}
				if (in != null) {
					in.close();
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return result;
	}
	
	/**
	 * 分析单个文件
	 * @param file
	 * @return 返回：如果是目录:目录路径(目录的hashCode), 如果是文件:文件路径(文件名hashCode, 文件内容hashCode)
	 */
	public String verifyFile(File file) {
		StringBuilder sBuilder = new StringBuilder();
		RandomAccessFile raf = null;
		FileChannel channel = null;
		ByteBuffer bb = null;
		try {
			raf = new RandomAccessFile(file, "r");
			channel = raf.getChannel();
			bb = ByteBuffer.allocate(256);
			while ( channel.read(bb) != -1) {
				bb.flip();  // 写准备(回绕缓冲区)
				CharBuffer decode = cs.decode(bb);
				sBuilder.append(decode);
				bb.clear(); // 读准备(清楚缓冲区)
			}
			if (printDetail) {
				System.out.println("打印文件:" + sBuilder);
			}
			return file.getAbsolutePath()+ "(" + file.getName().hashCode() + "," + sBuilder.toString().hashCode() + ")";
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				channel.close();
				raf.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return "";
	}
	// ************************************************************************//
	// ****************************以下内部方法****************************//
	// ***********************************************************************//

	/**
	 * 内部扫描方法
	 * @param location
	 *            扫描路径
	 * @param ignoreLocations
	 *            需要忽略的路径模式(可用通配符*，非贪婪模式)
	 * @param ignoreHiddenFiles
	 *            是否忽略隐藏文件
	 * @return 返回MD5摘要
	 */
	private void scanFile(String location, String ignoreLocations, boolean ignoreHiddenFiles) {
		if (ignoreLocations != null && !ignoreLocations.trim().equals("")) {
			ignoreLocations = ignoreLocations.replaceAll("\\\\", "\\\\\\\\").replaceAll("\\.", "\\\\.")
					.replaceAll("\\*", "[^\\\\\\\\]*?");
			if (printDetail) {
				System.out.println("ignoreLocations(非贪婪): " + ignoreLocations);
			}
			String[] patterns = ignoreLocations.split(";");
			Pattern[] patts = new Pattern[patterns.length];
			for (int i = 0, len = patterns.length; i < len; ++i) {
				patts[i] = Pattern.compile(patterns[i]);
			}
			searchDir(location, patts, ignoreHiddenFiles);
		} else {
			searchDir(location, null, ignoreHiddenFiles);
		}
	}
	
	/**
	 * 递归搜索目录
	 * @param path 
	 * 		目录路径
	 * @param patterns
	 * 		路径匹配模式
	 * @param ignoreHiddenFiles
	 * 		是否忽略隐藏文件
	 */
	private void searchDir(String path, Pattern[] patterns, boolean ignoreHiddenFiles) {
		File file = new File(path);
		File[] files = file.listFiles();
		if (files != null) {// path是目录，不是文件
			for (File f : files) {
				if (!isIgnore(f, patterns)) {// 是否忽略
					if (f.isDirectory()) {// 是目录，递归
						if (!ignoreHiddenFiles) {// 扫描隐藏文件
							getFiles().add(f);
							String code = f.getPath() + "(" + f.getPath().hashCode() + ")";
							// 添加到文件路径校验信息List
							fileInfo.add(code);
							// 递归
							searchDir(f.getAbsolutePath(), patterns, ignoreHiddenFiles);
						} else {  // 不扫描隐藏文件
							if (!f.isHidden()) {
								getFiles().add(f);
								String code = f.getPath() + "(" + f.getPath().hashCode() + ")";
								// 添加到文件路径校验信息List
								fileInfo.add(code);
								// 递归
								searchDir(f.getAbsolutePath(), patterns, ignoreHiddenFiles);
							}
						}
					} else {// 是文件，处理，添加到list
						if (!ignoreHiddenFiles) { // 扫描隐藏文件
							getFiles().add(f);
							// 添加文件校验信息
							fileInfo.add(verifyFile(f));
						} else  { // 不扫描隐藏文件
							if (!f.isHidden()) {
								getFiles().add(f);
								// 添加文件校验信息
								fileInfo.add(verifyFile(f));
							}
						}
					}
				}
			}
		} else if (file.isFile()) {// path是文件路径
			this.getFiles().add(file);
		} else // 找不到的路径
			;
	}

	/**
	 * 是否是忽略的目录
	 * @param srcFile
	 *            源文件
	 * @param patterns
	 *           匹配模式
	 * @return 是否需要忽略
	 */
	private boolean isIgnore(File srcFile, Pattern[] patterns) {
		String path = srcFile.getAbsolutePath();
		boolean flag = false;
		if (patterns == null || patterns.length == 0) {
			return false;
		} else {
			for (Pattern patt : patterns) {
				if (printDetail) {
					System.out.println("dir:\t\t" + path);
					System.out.println("pattern:\t" + patt.pattern());
				}
				Matcher matcher = patt.matcher(path);
				flag = matcher.find();
				if (printDetail) {
					System.out.println("matcher:\t" + flag);
				}
				if (flag) {
					flag = true;
					break;
				} else {
					continue;
				}
			}
			return flag;
		}
	}
}

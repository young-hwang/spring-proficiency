package me.springdatarediscountminsketch.util;

public class ByteUtil {
    public static byte[] longToBytes(long x) {
        byte[] bytes = new byte[8];
        for (int i = 0; i < 8; i++) {
            bytes[i] = (byte) (x >> (i * 8));
        }
        return bytes;
    }
}

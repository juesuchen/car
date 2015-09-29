package com.minisoft.utils;

import java.security.spec.KeySpec;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Base64;

public class Cryptos {
    private static final String AES = "AES";

    private static final String KEY = "inVaT8CoAqODCAEcNiIpWgxKwPOx";

    private static byte[] getDefaultKey() throws Exception {
        KeySpec spec = new PBEKeySpec(KEY.toCharArray(), KEY.getBytes(), 1000, 128);
        SecretKeyFactory f = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
        byte[] pbkdf2Key = f.generateSecret(spec).getEncoded();
        return pbkdf2Key;
    }

    public static byte[] aesEncrypt(byte[] input) throws Exception {

        return aes(input, getDefaultKey(), Cipher.ENCRYPT_MODE);
    }

    public static byte[] aesEncrypt(byte[] input, byte[] key) throws Exception {
        return aes(input, key, Cipher.ENCRYPT_MODE);
    }

    public static byte[] aesEncrypt(byte[] input, byte[] key, byte[] iv) throws Exception {
        return aes(input, key, iv, Cipher.ENCRYPT_MODE);
    }

    public static byte[] aesDecrypt(byte[] input, byte[] key) throws Exception {
        byte[] decryptResult = aes(input, key, Cipher.DECRYPT_MODE);
        return decryptResult;
    }

    public static byte[] aesDecrypt(byte[] input) throws Exception {
        byte[] decryptResult = aes(input, getDefaultKey(), Cipher.DECRYPT_MODE);
        return decryptResult;
    }

    public static byte[] aesDecrypt(byte[] input, byte[] key, byte[] iv) throws Exception {
        byte[] decryptResult = aes(input, key, iv, Cipher.DECRYPT_MODE);
        return decryptResult;
    }

    private static byte[] aes(byte[] input, byte[] key, int mode) throws Exception {
        try {
            SecretKey secretKey = new SecretKeySpec(key, AES);
            Cipher cipher = Cipher.getInstance(AES);
            cipher.init(mode, secretKey);
            return cipher.doFinal(input);
        } catch (Exception e) {
            throw e;
        }
    }

    private static byte[] aes(byte[] input, byte[] key, byte[] iv, int mode) throws Exception {
        try {
            SecretKey secretKey = new SecretKeySpec(key, "AES");
            IvParameterSpec ivSpec = new IvParameterSpec(iv);
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            cipher.init(mode, secretKey, ivSpec);
            return cipher.doFinal(input);
        } catch (Exception e) {
            throw e;
        }
    }

    public static void main(String[] args) throws Exception {
        String input = "xxx我是";
        byte[] aesEncrypt = aesEncrypt(input.getBytes());
        System.out.println(Base64.encodeBase64String(aesEncrypt));
        System.out.println(new String(aesDecrypt(aesEncrypt)));
    }

}
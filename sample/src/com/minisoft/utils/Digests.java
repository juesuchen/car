package com.minisoft.utils;

import java.security.MessageDigest;

import org.apache.commons.codec.binary.Base64;

public class Digests {

    private static final String SHA1 = "SHA-1";

    private static final int iter = 199;

    private static final String salt = "inVaT8CoAqODCAEcNiIpWgxKwPOx";

    public static byte[] sha1(byte[] input) throws Exception {
        return digest(input, SHA1, salt.getBytes(), iter);
    }

    public static String sha1Str(String input) {
        byte[] digest;
        try {
            digest = digest(input.getBytes(), SHA1, salt.getBytes(), iter);
            return Base64.encodeBase64String(digest);
        } catch (Exception e) {
        }
        return input;
    }

    public static byte[] sha1(byte[] input, byte[] salt) throws Exception {
        return digest(input, SHA1, salt, iter);
    }

    public static byte[] sha1(byte[] input, byte[] salt, int iterations) throws Exception {
        return digest(input, SHA1, salt, iterations);
    }

    private static byte[] digest(byte[] input, String algorithm, byte[] salt, int iterations) throws Exception {
        try {
            MessageDigest digest = MessageDigest.getInstance(algorithm);

            if (salt != null) {
                digest.update(salt);
            }

            byte[] result = digest.digest(input);

            for (int i = 1; i < iterations; i++) {
                digest.reset();
                result = digest.digest(result);
            }
            return result;
        } catch (Exception e) {
            throw e;
        }
    }

    public static void main(String[] args) throws Exception {
        String input = "我是adbXXJKDFJKS";
        System.out.println(sha1Str(input));

    }

}
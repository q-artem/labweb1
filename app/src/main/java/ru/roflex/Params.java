package ru.roflex;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

public class Params {
    private float X;
    private float Y;
    private Set<Integer> R;


    public Params(String body) throws ParamsException {
        Map<String, String> params = parseParams(body);

        if (!params.containsKey("Y") || !params.containsKey("R") || !params.containsKey("X")) {
            throw new ParamsException("Not all parameters are present: Y, R, X");
        }

        try {
            Y = Float.parseFloat(params.get("Y"));
            X = Float.parseFloat(params.get("X"));
            R = Arrays.stream(params.get("R").split(","))
                    .map(String::trim)
                    .map(Integer::parseInt)
                    .collect(Collectors.toSet());
        } catch (NumberFormatException e) {
            throw new ParamsException("Invalid parameter format");
        }

        validate(X, Y, R);
    }


    private static Map<String, String> parseParams(String body) {  // need to rewrite
        Map<String, String> params = new LinkedHashMap<>();
        String[] pairs = body.split("&");
        for (String pair : pairs) {
            String[] kv = pair.split("=", 2);
            String key = URLDecoder.decode(kv[0], StandardCharsets.UTF_8);
            String value = kv.length > 1 ? URLDecoder.decode(kv[1], StandardCharsets.UTF_8) : "";
            params.put(key, value);
        }
        return params;
    }

    private static void validate(float X, float Y, Set<Integer> R) throws ParamsException {
        if (Y < -3 || Y > 3) {
            throw new ParamsException("Y must be in the range (-5, 3)");
        }
        Set<Integer> validR = Set.of(1, 2, 3, 4, 5);
        for (Integer r : R) {
            if (!validR.contains(r)) {
                throw new ParamsException("R values must be in " + validR);
            }
        }
        Set<Float> validX = Set.of(-2f, -1.5f, -1f, -0.5f, 0f, 0.5f, 1f, 1.5f, 2f);
        if (!validX.contains(X)) {
            throw new ParamsException("X must be one of " + validX);
        }
    }


    public float getY() {
        return Y;
    }
    public Set<Integer> getR() {
        return R;
    }
    public float getX() {
        return X;
    }
}

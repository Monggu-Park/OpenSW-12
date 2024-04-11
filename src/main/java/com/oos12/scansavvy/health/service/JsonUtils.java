package com.oos12.scansavvy.health.service;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.constraints.NotNull;
import org.bson.json.JsonParseException;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class JsonUtils {

    @SuppressWarnings("unchecked")
    public static String getJsonStringFromMap(Map<String, Object> map) {

        JSONObject json = new JSONObject();

        for (Map.Entry<String, Object> entry : map.entrySet()) {
            json.put(entry.getKey(), entry.getValue());
        }

        return json.toJSONString();
    }

//    @SuppressWarnings("unchecked")
//    public static <List> String getJsonStringFromList(List list) {
//
//        JSONArray jsonArray = new JSONArray();
//
//        for (Map<String, Object> map : list) {
//            jsonArray.add(getJsonStringFromMap(map));
//        }
//
//        return jsonArray.toJSONString();
//    }

    /**
     * String을 JSONObject를 변환
     *
     * @param jsonStr
     * @return jsonObject
     */
    public static JSONObject getJsonObjectFromString(String jsonStr) {

        JSONObject jsonObject = new JSONObject();

        JSONParser jsonParser = new JSONParser();

        try {

            jsonObject = (JSONObject) jsonParser.parse(jsonStr);

        } catch (ParseException e) {
            e.printStackTrace();
        }

        return jsonObject;
    }

//    /**
//     * JSONObject를 Map<String, String>으로 변환
//     *
//     * @param jsonObject
//     * @return map
//     */
    @SuppressWarnings("unchecked")
    public static Map<String, Object> getMapFromJsonObject(JSONObject jsonObject) {

        Map<String, Object> map = null;

        try {

            map = new ObjectMapper().readValue(jsonObject.toJSONString(), Map.class);

        } catch (JsonParseException e) {
            e.printStackTrace();
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return map;
    }

//    /**
//     * JSONArray를 List<Map<String, String>>으로 변환
//     *
//     * @param jsonArray
//     * @return list
//     */
    public static List<Map<String, Object>> getListMapFromJsonArray(JSONArray jsonArray) {

        List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();

        if (jsonArray != null) {

            int jsonSize = jsonArray.size();

            for (int i = 0; i < jsonSize; i++) {

                Map<String, Object> map = getMapFromJsonObject((JSONObject)jsonArray.get(i));
                list.add(map);
            }
        }

        return list;
    }
}

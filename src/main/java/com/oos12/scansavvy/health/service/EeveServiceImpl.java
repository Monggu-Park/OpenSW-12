package com.oos12.scansavvy.health.service;

import com.oos12.scansavvy.health.model.EeveResponse;
import org.springframework.ai.chat.ChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EeveServiceImpl implements EeveService {
    private final ChatClient chatClient;

    @Autowired
    public EeveServiceImpl(ChatClient chatClient){
        this.chatClient = chatClient;
    }
    @Override
    public EeveResponse generateMessage(String promptMessage){
        final String eeveMessage = chatClient.call(promptMessage);
        return new EeveResponse().setMessage(eeveMessage);
    }

    @Override
    public EeveResponse generateJoke(String topic) {
        final String eeveMessage = chatClient.call(String.format("Tell me a joke about %s", topic));
        return new EeveResponse().setMessage(eeveMessage);
    }
}

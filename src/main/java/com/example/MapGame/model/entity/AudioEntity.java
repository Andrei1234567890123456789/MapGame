package com.example.MapGame.model.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "audio")
public class AudioEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Lob
    private byte[] audio;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public byte[] getAudio() {
        return audio;
    }

    public void setAudio(byte[] audio) {
        this.audio = audio;
    }

    public AudioEntity(byte[] audio) {
        this.audio = audio;
    }

    public AudioEntity(long id, byte[] audio) {
        this.id = id;
        this.audio = audio;
    }

    public AudioEntity() {

    }
}

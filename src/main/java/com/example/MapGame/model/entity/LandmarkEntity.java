package com.example.MapGame.model.entity;

import jakarta.persistence.*;
import org.springframework.context.annotation.EnableMBeanExport;

@Entity
@Table(name = "landmarks")
public class LandmarkEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long landmarkId;

    @Column(nullable = false, unique = true)
    private String title;

    @Column(nullable = false, length = 2000)
    private String description;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private double latitude;

    @Column(nullable = false)
    private double longitude;

    @OneToOne
    @JoinColumn(name = "image_id")
    private ImageEntity imageEntity;

    @OneToOne
    @JoinColumn(name = "audio_id")
    private AudioEntity audioEntity;

    public LandmarkEntity(String title, String description, String status, double latitude, double longitude, ImageEntity imageEntity, AudioEntity audioEntity) {
        this.title = title;
        this.description = description;
        this.status = status;
        this.latitude = latitude;
        this.longitude = longitude;
        this.imageEntity = imageEntity;
        this.audioEntity = audioEntity;
    }

    public ImageEntity getImageEntity() {
        return imageEntity;
    }

    public void setImageEntity(ImageEntity imageEntity) {
        this.imageEntity = imageEntity;
    }

    public AudioEntity getAudioEntity() {
        return audioEntity;
    }

    public void setAudioEntity(AudioEntity audioEntity) {
        this.audioEntity = audioEntity;
    }
    //    @OneToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "address_id", referencedColumnName = "id")
//    private Address address;


//    @OneToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "audio_id", referencedColumnName = "id")
//    private AudioEntity audioEntity;

    public LandmarkEntity() {
    }


    public Long getLandmarkId() {
        return landmarkId;
    }

    public void setLandmarkId(Long landmarkId) {
        this.landmarkId = landmarkId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }
}

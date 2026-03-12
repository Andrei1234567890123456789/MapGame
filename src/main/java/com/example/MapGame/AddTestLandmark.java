package com.example.MapGame;

import com.example.MapGame.model.dto.CreateLandmarkDTO;
import com.example.MapGame.service.LandmarkService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Component
public class AddTestLandmark implements CommandLineRunner {
    private LandmarkService landmarkService;

    public AddTestLandmark(LandmarkService landmarkService) {
        this.landmarkService = landmarkService;
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("adding test landmark");

        Path imagePath = Paths.get("src/main/resources/static/images/RaykoGaranow.jpg");
        Path audioPath = Paths.get("src/main/resources/static/audio/vine-boom.mp3");


        byte[] imageBytes = Files.readAllBytes(imagePath);
        byte[] audioBytes = Files.readAllBytes(audioPath);

        CreateLandmarkDTO landmarkDTO = new CreateLandmarkDTO("Къщата на Райко Гаранов ул. Дунав 2",
                "free to acces",
                "Един от най-красивите софийски домове пази историите за интригуващи личности и драматични събития, оставили следи върху развитието на София и цяла България. Сградата е била собственост на Райко Горанов от Тетевен, университетски преподавател и професор по латински и древногръцки, голям дарител на университетската библиотека и съхранен в спомените на своите студенти като тайнствена и елегантна личност. Снажен и сдържан в поведението си, професорът е бил на 43 години, когато неговата изящна къща е завършена. Днес сградата е обновена, така че да отразява оригиналната си красота и да бъде една от тайните находки на София. Великолепните фасади са дело на архитект Карл Хайнрих (роден в Бохемия и учил в германския град Цитау) и скулптура Андреас Грайс (виенчанин, завършил образованието си в родния град). И двамата улавят строителния дух на българските градове след Освобождението и избират да работят и творят в София в продължение на десетилетия и до края на живота си. В тази архитектурна задача двамата не пестят украса за да подчертаят прозорците и главния вход с хармонични извивки, цветя, листа и елегантни женски фигури, с които изпълват фасадите и ги правят уникални за цяла София. Уличната фасада е симетрична, докато фасадата към прилежащия двор е по-раздвижена в съответствие с идеите на сецесиона. Главният ход е разположен в изнесен напред ризалит, декориран с годината на сградата и разярена лъвска глава.",
                42.69734548485114, 23.33386452324154,
                imageBytes, audioBytes);

        landmarkService.createLandmark(landmarkDTO);
    }
}

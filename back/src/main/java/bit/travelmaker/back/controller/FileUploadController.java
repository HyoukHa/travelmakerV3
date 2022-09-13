package bit.travelmaker.back.controller;
import bit.travelmaker.back.service.S3Upload;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/api")
public class FileUploadController{


    @Autowired
    private final S3Upload s3Upload;

    @PostMapping("/profile/upload")
    public ResponseEntity<Object> uploadFile(@RequestParam(value = "image") MultipartFile multipartFile) throws IOException {
        System.out.println("1 : " + multipartFile.getSize());
        System.out.println("1.1 : " + multipartFile.getContentType());

        return new ResponseEntity<>(s3Upload.upload(multipartFile,multipartFile.getInputStream(), multipartFile.getOriginalFilename(),multipartFile.getSize()), HttpStatus.OK);
    }


    @PostMapping("/board/upload")
    public ResponseEntity<Object> upload(@RequestParam(value = "multiPratFile") MultipartFile[] multipartFileList) throws Exception {

        return new ResponseEntity<>(s3Upload.uploadImage(multipartFileList), HttpStatus.OK);
    }

}
package bit.travelmaker.back.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class S3Upload {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.s3.dir}")
    private String dir;

    private final AmazonS3Client s3Client;

    public String upload(MultipartFile multipartFile,InputStream inputStream, String originFileName, long fileSize) {
        String s3FileName = UUID.randomUUID() + "-" + originFileName;
        System.out.println("2 : ");
        ObjectMetadata objMeta = new ObjectMetadata();
        objMeta.setContentType(multipartFile.getContentType());
        objMeta.setContentLength(fileSize);
        System.out.println("3 : ");
        System.out.println("dir : "+ dir);
        System.out.println("s3FileName : "+ s3FileName);
        s3Client.putObject(bucket, dir+s3FileName, inputStream, objMeta);
        System.out.println("4 : ");
        return s3Client.getUrl(bucket, dir + s3FileName).toString();
    }

    public List<String> uploadImage(MultipartFile[] multipartFileList) {
        List<String> imagePathList = new ArrayList<>();

        for (MultipartFile multipartFile : multipartFileList) {
            String originalName = UUID.randomUUID() + "-" + multipartFile.getOriginalFilename(); // 파일 이름
            long size = multipartFile.getSize(); // 파일 크기

            ObjectMetadata objectMetaData = new ObjectMetadata();
            objectMetaData.setContentType(multipartFile.getContentType());
            objectMetaData.setContentLength(size);

            try (InputStream inputStream = multipartFile.getInputStream()) {
                s3Client.putObject(
                        bucket, dir + originalName, multipartFile.getInputStream(), objectMetaData);

            } catch (IOException e) {
                // S3에 업로드

            }

            String imagePath = s3Client.getUrl(bucket, dir + originalName).toString(); // 접근가능한 URL 가져오기
            imagePathList.add(imagePath);
            for(int i =0; i <imagePathList.size()-1; i++){
                System.out.println(imagePathList.get(i));
            }

        }
        return imagePathList;
    }

    public void deleteImage(String fileName) {
        s3Client.deleteObject(new DeleteObjectRequest(bucket, fileName));
    }

    private String createFileName(String fileName) {
        return UUID.randomUUID().toString().concat(getFileExtension(fileName));
    }

    private String getFileExtension(String fileName) {
        try {
            return fileName.substring(fileName.lastIndexOf("."));
        } catch (StringIndexOutOfBoundsException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일(" + fileName + ") 입니다.");
        }
    }

}
package bit.travelmaker.back;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class BackApplication {

	public static void main(String[] args) {
//		String str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
//		List<String> arrList = new ArrayList<String>();
//		for(int i = 0 ; i < str.length() ; i++) {
//			arrList.add(str.split("")[i]);
//		}
//		System.out.println(arrList);
		SpringApplication.run(BackApplication.class, args);

	}

}

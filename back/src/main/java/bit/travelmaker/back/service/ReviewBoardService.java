package bit.travelmaker.back.service;

import bit.travelmaker.back.mapper.ReviewBoardMapper;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
@Slf4j
@AllArgsConstructor
public class ReviewBoardService {
    @Autowired
    private ReviewBoardMapper reviewBoardMapper;

    public HashMap<String, Object> getDetailReview(final HashMap<String, Object> req) {
        HashMap<String, Object> res = new HashMap<>();

        return null;
    }
}

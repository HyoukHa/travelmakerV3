package bit.travelmaker.back.service;

import bit.travelmaker.back.dto.out.OutReviewCard;
import bit.travelmaker.back.mapper.ReviewBoardMapper;
import bit.travelmaker.back.model.BoardEntity;
import bit.travelmaker.back.model.ReviewBoardEntity;
import bit.travelmaker.back.persistence.BoardRepository;
import bit.travelmaker.back.persistence.ReviewBoardRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

@Service
@Slf4j
@AllArgsConstructor
public class ReviewBoardService {
    @Autowired
    private ReviewBoardMapper reviewBoardMapper;

    @Autowired
    private ReviewBoardRepository reviewBoardRepository;

    @Autowired
    private BoardRepository boardRepository;

    public List<OutReviewCard> getReviewList(final int pagenum){
        return reviewBoardMapper.getReviewList((pagenum-1) * 8);
    }

    public List<OutReviewCard> getMyReviewList(final int userId){
        return reviewBoardMapper.getMyReviewList(userId);
    }

    public Integer reviewCount() {
        return reviewBoardMapper.reviewCounter();
    }

    public HashMap<String, Object> getDetailReview(final Integer reviewId) {
        HashMap<String, Object> res = reviewBoardMapper.getDetailReview(reviewId);

        res.put("viewCount", (Integer)res.get("viewCount") + 1);

        reviewBoardMapper.viewCounter(res);

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        res.put("written_date", sdf.format(res.get("written_date")));

        return res;
    }

    public Integer writeReview(final HashMap<String, Object> req) {
        BoardEntity data = BoardEntity.builder()
                .userId((Integer)req.get("userId"))
                .category(3)
                .title((String)req.get("title"))
                .content((String)req.get("content"))
                .viewCount(0)
                .written_date(new Date())
                .updated_date(new Date())
                .imgs((String)req.get("imgs"))
                .build();

        BoardEntity resBoard = boardRepository.save(data);
        System.out.println(resBoard);

        ReviewBoardEntity reviewBoardEntity = ReviewBoardEntity.builder()
                .id(resBoard.getId())
                .packageBoardId((Integer) req.get("packageBoardId"))
                .build();

        reviewBoardRepository.save(reviewBoardEntity);

        return resBoard.getId();
    }
}

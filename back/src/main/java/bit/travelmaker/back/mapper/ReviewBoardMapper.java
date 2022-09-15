package bit.travelmaker.back.mapper;

import bit.travelmaker.back.dto.out.OutPackageCard;
import bit.travelmaker.back.dto.out.OutReviewCard;
import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface ReviewBoardMapper {
    HashMap<String, Object> getDetailReview(Integer reviewId);

    void viewCounter(HashMap<String, Object> req);

    List<OutReviewCard> getReviewList(int pageNum);

    List<OutReviewCard> getMyReviewList(int pageNum);

    List<HashMap<String, Object>> getPopularReviewList();

    Integer reviewCounter();
}

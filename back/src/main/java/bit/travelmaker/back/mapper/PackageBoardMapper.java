package bit.travelmaker.back.mapper;

import bit.travelmaker.back.dto.out.OutPackageCard;
import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface PackageBoardMapper {

    HashMap<String, Object> getDetailPackage(final int boardId);

    void viewCounter(HashMap<String, Object> req);

    List<OutPackageCard> PKCardPusher(int pageNum);

    List<OutPackageCard> myPKCardPusher(int userId);

    Integer packageCounter();

    Integer myPackageCounter(int userId);

    Integer findIdByUserIdAndBoardId(HashMap<String, Object> req);

    void doWish(final HashMap<String, Object> req);

    void undoWish(final int id);

    List<HashMap<String, Object>> isWish(HashMap<String, Object> req);
}

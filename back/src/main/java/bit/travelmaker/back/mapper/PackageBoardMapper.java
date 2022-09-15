package bit.travelmaker.back.mapper;

import bit.travelmaker.back.dto.in.InPackageBoard;
import bit.travelmaker.back.dto.out.OutPackageCard;
import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface PackageBoardMapper {

    HashMap<String, Object> getDetailPackage(final int boardId);

    void viewCounter(HashMap<String, Object> req);

    Integer findJoinIdByUserIdAndPackageId(HashMap<String, Integer> req);

    void joinPackage(HashMap<String, Integer> req);

    void undoJoinPackage(int id);

    List<OutPackageCard> getPackageList(int pageNum);

    List<OutPackageCard> getMyPackageList(int userId);

    Integer packageCounter();

    Integer myPackageCounter(int userId);

    Integer findIdByUserIdAndBoardId(HashMap<String, Object> req);

    void doWish(final HashMap<String, Object> req);

    void undoWish(final int id);

    List<HashMap<String, Object>> isWish(HashMap<String, Object> req);
}

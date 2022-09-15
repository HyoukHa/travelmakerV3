package bit.travelmaker.back.service;

import bit.travelmaker.back.dto.in.InPackageBoard;
import bit.travelmaker.back.dto.out.OutPackageCard;
import bit.travelmaker.back.mapper.PackageBoardMapper;
import bit.travelmaker.back.model.BoardEntity;
import bit.travelmaker.back.model.PackageBoardEntity;
import bit.travelmaker.back.persistence.BoardRepository;
import bit.travelmaker.back.persistence.PackageBoardRepository;
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
public class PackageBoardService {

    @Autowired
    private PackageBoardMapper packageBoardMapper;

    @Autowired
    private PackageBoardRepository packageBoardRepository;

    @Autowired
    private BoardRepository boardRepository;

//    @Autowired
//    private WishListRepository wishListRepository;

    public HashMap<String, Object> getDetailPackage(final int boardId) {
        HashMap<String, Object> res = packageBoardMapper.getDetailPackage(boardId);

        res.put("viewCount", (Integer)res.get("viewCount") + 1);
        System.out.println(res);

        packageBoardMapper.viewCounter(res);

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        res.put("written_date", sdf.format(res.get("written_date")));

        return res;
    }

    public Integer writePackageBoard(final HashMap<String, Object> req) {
        BoardEntity data = BoardEntity.builder()
                .userId((Integer)req.get("userId"))
                .category(2)
                .title((String)req.get("title"))
                .content((String)req.get("content"))
                .viewCount(0)
                .written_date(new Date())
                .updated_date(new Date())
                .imgs((String)req.get("imgs"))
                .build();

        BoardEntity resBoard = boardRepository.save(data);

        PackageBoardEntity packageBoardEntity = PackageBoardEntity.builder()
                .id(resBoard.getId())
                .limit_to((Integer)req.get("limit_to"))
                .current_to(0)
                .duration((Integer)req.get("duration"))
                .budget((Integer)req.get("budget"))
                .location((String) req.get("schedule"))
                .start_date((Date)req.get("startdate"))
                .build();


        packageBoardRepository.save(packageBoardEntity);

        return resBoard.getId();
    }


    public List<OutPackageCard> getPackageList(final Integer pageNum) {
        return packageBoardMapper.getPackageList((pageNum-1) * 8);
    }

    public List<HashMap<String, Object>> getPopularPackageList() {
        return packageBoardMapper.getPopularPackageList();
    }

    public Integer packageCount(){
        return packageBoardMapper.packageCounter();
    }

    public List<OutPackageCard> getMyPackageList(final int userId) {
        return packageBoardMapper.getMyPackageList(userId);
    }

    public Integer myPackageCount(final int userId) {return packageBoardMapper.myPackageCounter(userId);}

    public Boolean doWish(final HashMap<String, Object> req) {
        Boolean res = false;

        Integer id = packageBoardMapper.findIdByUserIdAndBoardId(req);

        if(id == null) {
            packageBoardMapper.doWish(req);
            res = true;
        }else {
            packageBoardMapper.undoWish(id);
        }

        return res;
    }



    public Boolean doJoin(final HashMap<String, Integer> req) {
        System.out.println(req);
        Boolean res = false;

        Integer id = packageBoardMapper.findJoinIdByUserIdAndPackageId(req);
        if(id == null) {
            packageBoardMapper.joinPackage(req);
            res = true;
        }else {
            packageBoardMapper.undoJoinPackage(id);
        }

        return res;
    }

    public List<HashMap<String, Object>> isWish(HashMap<String, Object> req) {
        List<HashMap<String, Object>> res = packageBoardMapper.isWish(req);

        System.out.println("res");
        System.out.println(res);

        System.out.println("req");
        System.out.println(req);

        return res;
    }

    public Boolean isJoin(HashMap<String, Integer> req) {
        Boolean res = false;

        Integer resData = packageBoardMapper.findJoinIdByUserIdAndPackageId(req);

        if(resData != null) {
            res = true;
        }

        return res;
    }

    public List<HashMap<String, Object>> joinPackageList(final Integer userId) {
        return packageBoardMapper.joinPackageList(userId);
    }
}

package bit.travelmaker.back.service;

import bit.travelmaker.back.dto.out.OutPackageCard;
import bit.travelmaker.back.mapper.PackageBoardMapper;
import bit.travelmaker.back.persistence.BoardRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;

@Service
@Slf4j
@AllArgsConstructor
public class PackageBoardService {

    @Autowired
    private PackageBoardMapper packageBoardMapper;

    @Autowired
    private BoardRepository boardRepository;

//    @Autowired
//    private WishListRepository wishListRepository;

    public HashMap<String, Object> getDetailPackage(final int boardId) {
        HashMap<String, Object> res = packageBoardMapper.getDetailPackage(boardId);

        res.put("viewCount", (Integer)res.get("viewCount") + 1);

        packageBoardMapper.viewCounter(res);

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        res.put("written_date", sdf.format(res.get("written_date")));

        return res;
    }


    public List<OutPackageCard> PKCardPush(final Integer pageNum) {
        return packageBoardMapper.PKCardPusher((pageNum-1) * 8);
    }

    public Integer packageCount(){
        return packageBoardMapper.packageCounter();
    }

    public List<OutPackageCard> myPKCardPush(final int userId) {
        return packageBoardMapper.myPKCardPusher(userId);
    }

    public Integer myPackageCount(final int userId) {return packageBoardMapper.myPackageCounter(userId);}

    public Boolean doWish(final HashMap<String, Object> req) {
        Integer id = packageBoardMapper.findIdByUserIdAndBoardId(req);

        Boolean res = false;
        System.out.println(req);

        if(id == null) {
            packageBoardMapper.doWish(req);
            res = true;
        }else {
            packageBoardMapper.undoWish(id);
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


}

package bit.travelmaker.back.service;

import bit.travelmaker.back.mapper.SearchMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class SearchService {

    @Autowired
    private SearchMapper searchMapper;

    public List<HashMap<String, Object>> searching(HashMap<String, Object> req) {
        String keyword = req.get("keyword").toString();
        System.out.println(keyword);
        List<HashMap<String, Object>> res = searchMapper.getSearchingResult(keyword);

        return res;
    }
}

package bit.travelmaker.back.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface SearchMapper {

    public List<HashMap<String, Object>> getSearchingResult(final String keyword);
}
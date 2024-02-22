namespace Search.Models.DataTransferObjects;

public record PagedResponse<T>(List<T> data, int currentPage, int? nextPage);
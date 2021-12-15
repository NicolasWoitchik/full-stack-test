import axios from 'axios';
import { IBeer } from '../dtos/IBeerDTO';

interface IRequest {
  page?: number;
}

class ListUsersService {
  public async execute({ page }: IRequest): Promise<IBeer[]> {
    const currentPage = page || 1;
    const { data } = await axios({
      method: 'get',
      url: `https://api.punkapi.com/v2/beers?page=${currentPage}&per_page=10`,
    });

    return data;
  }
}

export default ListUsersService;

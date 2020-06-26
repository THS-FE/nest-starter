import { Test, TestingModule } from '@nestjs/testing';
import { CommUtilsService } from './comm-utils.service';

describe('CommUtilsService', () => {
  let service: CommUtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommUtilsService],
    }).compile();

    service = module.get<CommUtilsService>(CommUtilsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

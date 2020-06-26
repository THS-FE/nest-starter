import { Test, TestingModule } from '@nestjs/testing';
import { FileUtilsService } from './file-utils.service';

describe('FileUtilsService', () => {
  let service: FileUtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileUtilsService],
    }).compile();

    service = module.get<FileUtilsService>(FileUtilsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

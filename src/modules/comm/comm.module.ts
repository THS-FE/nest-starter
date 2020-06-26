import { Module, HttpModule } from '@nestjs/common';
import { CommController } from './comm.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AttachmentSchema } from '../../schemas/attachment.schema';
import { CommUtilsService } from './services/comm-utils/comm-utils.service';
import { FileUtilsService } from './services/file-utils/file-utils.service';
import { HttpClientService } from './services/http-client/http-client.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Attachment',
        schema: AttachmentSchema,
        collection: 'attachment',
      },
    ]),
    HttpModule,
  ],
  providers: [CommUtilsService, FileUtilsService, HttpClientService],
  exports: [HttpClientService],
  controllers: [CommController],
})
export class CommModule { }

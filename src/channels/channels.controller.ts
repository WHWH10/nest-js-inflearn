import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('CHANNEL')
@Controller('api/workspaces/:url/channels')
export class ChannelsController {
  @Get()
  getAllChannels() {}

  @Post()
  createChannel() {}

  @Get(':name')
  getSpecificChannel() {}

  @Get(':id/chats')
  getChats(
    @Query('perPage') perPage,
    @Query('page') page,
    @Param('id') id,
    @Param('url') url,
  ) {
    console.log(perPage, page);
    console.log(id, url);
  }

  @Post(':id/chats')
  postChats(@Body() body) {}

  @Get(':name/members')
  getAllMembers() {}

  @Post(':name/members')
  inviteMembers() {}
}

import { supabase } from '@/lib/supabaseClient';

export async function getChannelById(channelId: number) {
  return await supabase
    .from('channels')
    .select('*')
    .eq('id', channelId)
    .single();
}

type ChannelByIdResponse = Awaited<ReturnType<typeof getChannelById>>;
export type ChannelByIdResponseSuccess = ChannelByIdResponse['data'];
export type ChannelByIdResponseError = ChannelByIdResponse['error'];

export async function getChannelsInServer(serverId: number) {
  return await supabase
    .from('channels')
    .select('*')
    .eq('server_id', serverId);
}

type ChannelsInServerResponse = Awaited<ReturnType<typeof getChannelsInServer>>;
export type ChannelsInServerResponseSuccess = ChannelsInServerResponse['data'];
export type ChannelsInServerResponseError = ChannelsInServerResponse['error'];

export async function createChannel(serverId: number, name: string, desciption: string | null = null) {
  return await supabase
    .from('channels')
    .insert({
      server_id: serverId,
      name: name,
      description: desciption,
    })
    .single();
}

type CreateChannelResponse = Awaited<ReturnType<typeof createChannel>>;
export type CreateChannelResponseSuccess = CreateChannelResponse['data'];
export type CreateChannelResponseError = CreateChannelResponse['error'];

export async function deleteChannel(channelId: number) {
  return await supabase
    .from('channels')
    .delete()
    .eq('id', channelId)
    .single();
}

type DeleteChannelResponse = Awaited<ReturnType<typeof deleteChannel>>;
export type DeleteChannelResponseSuccess = DeleteChannelResponse['data'];
export type DeleteChannelResponseError = DeleteChannelResponse['error'];

export async function updateChannel(channelId: number, name: string, description: string | null) {
  return await supabase
    .from('channels')
    .update({
      name: name,
      description: description,
    })
    .eq('id', channelId)
    .single();
}

type UpdateChannelResponse = Awaited<ReturnType<typeof updateChannel>>;
export type UpdateChannelResponseSuccess = UpdateChannelResponse['data'];
export type UpdateChannelResponseError = UpdateChannelResponse['error'];
import AddServerIcon from '@/components/icons/AddServerIcon';
import { SearchBar } from '@/components/forms/Styles';
import { useEffect, useState } from 'react';
import Server from '@/components/home/Server';
import type { ServerUser } from '@/types/dbtypes';
import { useServerlistRealtimeRef } from '@/context/ChatCtx';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { ServersForUser } from '@/types/dbtypes';
import { getServerForUser, getServersForUser } from '@/services/server.service';

export default function ServerList() {
  //TODO: fetch server_users via profile id, select server_id -> fetch channels via this server_id && fetch servers with server_id
  //This should at minimum return server_id, author_id (serveruser id), server name, channel id, channel name

  //TODO: Display default page (when user belongs to and has no servers)

  const [addServerhover, setAddServerHover] = useState(false);
  const supabase = useSupabaseClient();
  const [expanded, setExpanded] = useState(0);
  const user = useUser();
  const realtimeRef = useServerlistRealtimeRef();
  const [servers, setServers] = useState<ServersForUser[]>([]);

  useEffect(() => {
    if (user) {
      const handleAsync = async () => {
        const { data, error } = await getServersForUser(supabase, user.id);

        if (error) {
          console.error(error);
        }

        if (data) {
          setServers(data as ServersForUser[]);
        }
      };

      handleAsync();
    }
  }, [user, supabase]);

  useEffect(() => {
    realtimeRef
      .on<ServerUser>(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'server_users' },
        async (payload) => {
          const { data, error } = await getServerForUser(
            supabase,
            (payload.new as ServerUser).id
          );

          if (error) {
            console.error(error);
            return;
          }

          setServers(servers.concat(data as ServersForUser));
        }
      );
  }, [supabase, servers, realtimeRef]);
  //TODO: add isServer check

  return (
    <div className=" p-4 min-h-0">
      <div className="flex pb-3 items-center border-b-2 border-grey-700">
        <h1 className=" text-5xl font-bold tracking-wide">Servers</h1>
        <div
          className="pt-2 ml-3 hover:cursor-pointer"
          onMouseEnter={() => setAddServerHover(true)}
          onMouseLeave={() => setAddServerHover(false)}
        >
          <AddServerIcon hovered={addServerhover} />
        </div>
      </div>
      <div className="pt-4 pb-4">
        <input
          type="text"
          className={`${SearchBar}`}
          placeholder="Search"
        ></input>
      </div>
      {servers &&
        servers.map((server) => {
          if (server) {
            return (
              <span
                key={server.server_id}
                onClick={() => {
                  return expanded == server.server_id
                    ? setExpanded(0)
                    : setExpanded(server.server_id);
                }}
              >
                <Server server={server.servers} expanded={expanded} />
              </span>
            );
          }
        })}
    </div>
  );
}

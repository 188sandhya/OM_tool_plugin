FROM eb2/eb-grafana
USER root
RUN rm -rf /var/lib/grafana/plugins/eb
RUN rm -rf /var/lib/grafana/plugins/eb/MANIFEST.txt
COPY ./dist /var/lib/grafana/plugins/eb
USER grafana